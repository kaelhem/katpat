import { all, fork } from 'redux-saga/effects'
import { katpatSaga } from './katpat'

function *appSaga() {
  yield all([
    fork(katpatSaga),
  ])
}

export default appSaga