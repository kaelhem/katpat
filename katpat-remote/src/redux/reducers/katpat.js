// status
export const bleStatus = {
  DISCONNECTED: 'DISCONNECTED',
  SCANNING: 'SCANNING',
  CONNECTING: 'CONNECTING',
  CONNECTED: 'CONNECTED'
}

// katpat commands
export const commands = {
  INIT: 'INIT'
}

export const types = {
  CONNECT: 'katpat/ble/CONNECT',
  DISCONNECT: 'katpat/ble/DISCONNECT',
  STATUS_UPDATE: 'katpat/ble/STATUS_UPDATE',
  SEND: 'katpat/ble/SEND'
}

const initialState = {
  katpatName: 'Katpat', // HM10 module name
  error: null,
  status: bleStatus.DISCONNECTED,
  device: null
}

export default function katpatReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.STATUS_UPDATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export const actions = {
  connect: () => ({type: types.CONNECT}),
  disconnect: () => ({type: types.DISCONNECT}),
  updateStatus: (status, device=null, error=null) => ({type: types.STATUS_UPDATE, payload: {status, device, error}}),
  send: (command) => ({type: types.SEND, payload: command})
}

export const selectors = {
  getStatus: (state) => state.katpat.status,
  getDevice: (state) => state.katpat.device,
  getKaptpatName: (state) => state.katpat.katpatName
}