import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { actions as appActions } from 'redux/reducers/app'
import rootSaga from 'redux/sagas'
import Routes from './routes'
import { Plugins } from '@capacitor/core'
const { Device, SplashScreen, StatusBar } = Plugins

const store = configureStore()
store.runSaga(rootSaga)

Device.getInfo().then(({ platform }) => {
  if (platform !== 'web') {
    StatusBar.hide()
    SplashScreen.hide()
  }
  store.dispatch(appActions.setupPlatform(platform))
})

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

export default App
