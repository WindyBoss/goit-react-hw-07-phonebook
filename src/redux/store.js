import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import logger from 'redux-logger';
import filterReducer from './filter/filterSlice';
import apiService from 'service/apiService';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'contacts',
    storage,
};

const rootReducer = combineReducers({
    contacts: persistReducer(persistConfig, apiService.reducer),
    filter: filterReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
        // .concat(logger)
        .concat(apiService.middleware),
});
const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
