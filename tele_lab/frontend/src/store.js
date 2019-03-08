import storage from 'redux-persist/es/storage'
import apiMiddleware from './middleware';
import {applyMiddleware, createStore, compose} from 'redux'
import {createFilter} from 'redux-persist-transform-filter';
import {persistReducer, persistStore} from 'redux-persist'
import {routerMiddleware} from 'react-router-redux'
import rootReducer from './reducers'

export default (history) => {
    const persistedFilter = createFilter(
        'auth', ['access', 'refresh', 'is_admin']);
    const reducer = persistReducer(
        {
            key: 'polls',
            storage: storage,
            whitelist: ['auth'],
            transforms: [persistedFilter]
        },
        rootReducer);
    const store = createStore(
        reducer,
        {},
        compose(
            applyMiddleware(apiMiddleware, routerMiddleware(history)),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );
    persistStore(store);
    return store
}