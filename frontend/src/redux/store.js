import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composedWithDevTools } from 'redux-devtools-extension';

const store = createStore( rootReducer, composedWithDevTools(applyMiddleware(thunk)));

const DataProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider;