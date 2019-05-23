export const types = {
  SETUP_PLATFORM: 'katpat/app/SETUP_PLATFORM'
}

const initialState = {
  platform: null
}

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SETUP_PLATFORM: {
      return {
        ...state,
        platform: action.payload
      }
    }
    default:
      return state
  }
}

export const actions = {
  setupPlatform: (platform) => ({type: types.SETUP_PLATFORM, payload: platform})
}

export const selectors = {
  getPlatform: (state) => state.app.platform,
  isWebApp: (state) => state.app.platform === 'web'
}