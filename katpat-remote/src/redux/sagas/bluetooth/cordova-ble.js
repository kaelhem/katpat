import { bleStatus } from 'redux/reducers/katpat'
import { eventChannel } from 'redux-saga'
import ble from 'cordova-plugin-ble-central/www/ble'
import { ab2str } from 'utils/converters'

export const disconnect = ({ id }) => {
  return new Promise((resolve, reject) => {
    ble.disconnect(id, resolve, reject)
  })
}

export const sendCommand = (device, command) => {
  return new Promise((resolve, reject) => {
    ble.write(device.id, device.service, device.characteristic, command, resolve, reject)
  })
}

export const createConnectionChannel = (deviceName) => {
  return eventChannel(emit => {
    let timer = setTimeout(() => {
      emit({status: bleStatus.DISCONNECTED, error: 'Connection timeout. Check the power of your bot and retry!'})
    }, 5500)
    let connectedDevice = null
    let stringBuffer = null

    const stopNotifications = () => {
      if (connectedDevice) {
        ble.stopNotification(connectedDevice.id, connectedDevice.service, connectedDevice.characteristic)
      }
    }

    ble.scan([], 5, (device) => {
      if (device.name === deviceName) {
        clearTimeout(timer)
        ble.stopScan(() => {
          console.log('scan stopped!')
        }, () => {
          console.log('scan failed to stop :(')
        })
        emit({status: bleStatus.CONNECTING})
        ble.connect(device.id, ({characteristics}) => {
          connectedDevice = {
            id: device.id,
            service: characteristics[0].service,
            characteristic: characteristics[0].characteristic
          }
          emit({
            status: bleStatus.CONNECTED,
            device: connectedDevice
          })
          ble.startNotification(device.id, connectedDevice.service, connectedDevice.characteristic, (buffer) => {
            let strBuffer = ab2str(buffer)
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
          }, (e) => {
            console.log(e)
          });
        }, (err) => {
          console.log(err)
          stopNotifications()
          emit({status: bleStatus.DISCONNECTED, error: err.message})
        })
      }
    }, (err) => {
      console.log(err)
      clearTimeout(timer)
      stopNotifications()
      emit({status: bleStatus.DISCONNECTED, error: err.message})
    })
    // The subscriber must return an unsubscribe function. We'll
    // just return no op for this example.
    return () => {
      // Cleanup event listeners. Clear timers etc...
      stopNotifications()
    }
  })
}