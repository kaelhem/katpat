import { bleStatus } from 'redux/reducers/katpat'
import { eventChannel } from 'redux-saga'
import { ab2str } from 'utils/converters'

export const disconnect = ({ ref }) => {
  return new Promise((resolve) => {
    ref.gatt.disconnect()
    resolve()
  })
}

export const sendCommand = ({ characteristic }, command) => {
  return characteristic.writeValue(command)
}

export const createConnectionChannel = (deviceName) => {
  return eventChannel(emit => {
    let bleDevice = null
    let primaryCharacteristic = null
    let stringBuffer = null
    
    const disconnectFunction = () => {
      emit({status: bleStatus.DISCONNECTED})
    }

    const handleCharacteristicValueChanged = (event) => {
      let value = event.target.value;
      // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
      value = value.buffer ? value : new DataView(value)
      let strBuffer = ab2str(value.buffer)
      if (strBuffer.startsWith('START')) {
        stringBuffer = strBuffer.substr(5)
      } else if (stringBuffer) {
        stringBuffer += strBuffer
      }
      if (stringBuffer && stringBuffer.endsWith('DONE')) {
        stringBuffer = stringBuffer.slice(0, -4)
        emit({data: stringBuffer})
        stringBuffer = null
      }
    }

    const stopNotifications = () => {
      if (primaryCharacteristic) {
        primaryCharacteristic.stopNotifications()
        primaryCharacteristic.removeEventListener('characteristicvaluechanged', handleCharacteristicValueChanged)
        primaryCharacteristic = null
      }
    }

    navigator.bluetooth.requestDevice({
      filters: [{
        services: [0xFFE0] //'0000ffe0-0000-1000-8000-00805f9b34fb'
      }]
    })
    .then(device => {
      bleDevice = device
      emit({status: bleStatus.CONNECTING})
      device.addEventListener('gattserverdisconnected', disconnectFunction)
      return device.gatt.connect()
    })
    .then(server => {
      return server.getPrimaryService(0xFFE0);
    })
    .then(service => {
      return service.getCharacteristic(0xFFE1);
    })
    .then(characteristic => {
      emit({
        status: bleStatus.CONNECTED,
        device: {
          ref: bleDevice,
          characteristic: characteristic
        }
      })
      return characteristic.startNotifications()
    })
    .then(characteristic => {
      primaryCharacteristic = characteristic
      primaryCharacteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged)
    })
    .catch(err => {
      stopNotifications()
      emit({status: bleStatus.DISCONNECTED, error: err.message})
    })

    return () => {
      stopNotifications()
      if (bleDevice) {
        bleDevice.removeEventListener('gattserverdisconnected', disconnectFunction)
      }
    }
  })
}