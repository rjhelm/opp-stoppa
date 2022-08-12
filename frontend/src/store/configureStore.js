import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers';
import createSageMiddleware from 'redux-saga';
import rootSaga from './sagas';

export const configureStore = () => {
    const sagaMiddleware = createSageMiddleware();
    const compseEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, compseEnhancers(
        applyMiddleware(sagaMiddleware)
    ));
    sagaMiddleware.run(rootSaga);
    return store;
}