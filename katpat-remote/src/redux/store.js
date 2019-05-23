import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleWare from 'redux-saga'
import rootReducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleWare()

export default () => {
  return {
    ...createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware))),
    runSaga: sagaMiddleware.run
  }
}