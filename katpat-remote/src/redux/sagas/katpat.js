import { all, call, put, takeEvery, select, fork, delay } from 'redux-saga/effects'
import { actions, types, selectors, bleStatus, commands } from 'redux/reducers/katpat'
import { str2ab } from 'utils/converters'

let bleService
if (window.cordova) {
  bleService = require('./bluetooth/cordova-ble')
} else {
  bleService = require('./bluetooth/web-ble')
}

export function *disconnectSaga() {
  const device = yield select(selectors.getDevice)
  try {
    yield call(bleService.disconnect, device)
    yield put(actions.updateStatus(bleStatus.DISCONNECTED))
  } catch (e) {
    console.log(e)
    console.log('cannot disconnect from katpat :(')
  }
}

export function *connectSaga({ id }) {
  yield put(actions.updateStatus(bleStatus.SCANNING))
  yield delay(100)
  const katpatName = yield select(selectors.getKaptpatName)
  const channel = yield call(bleService.createConnectionChannel, katpatName)
  try {
    yield takeEvery(channel, function*({ data, status, device, error }) {
      if (data) {
        // received data
        console.log(data)
        let dataArr = data.split(';')
        let len = parseInt(dataArr.pop(), 10) - 1
        if (dataArr.join(';').length === len) {
          console.log('integrity check OK')
        }
      } else {
        // connection status update
        yield put(actions.updateStatus(status, device, error))
        if (status === bleStatus.CONNECTED && device) {
          yield put(actions.send(commands.INIT))
        }
      }
    })
  } catch (e) {
    console.log(e)
    yield put(actions.updateStatus(bleStatus.DISCONNECTED, null, e.message))
  }
}

export function *sendSaga({ payload }) {
  console.log('send: ', payload)
  const device = yield select(selectors.getDevice)
  if (device) {
    yield call(bleService.sendCommand, device, str2ab(`/${payload}/`))
  }
}

export function *watchConnect() {
  yield takeEvery(types.CONNECT, connectSaga)
}

export function *watchDisconnect() {
  yield takeEvery(types.DISCONNECT, disconnectSaga)
}

export function *watchSend() {
  yield takeEvery(types.SEND, sendSaga)
}

/**
* Katpat BLE saga
*/
export function *katpatSaga() {
  yield all([
    fork(watchConnect),
    fork(watchDisconnect),
    fork(watchSend)
  ])
}