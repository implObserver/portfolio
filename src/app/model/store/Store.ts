
import { bookReducer } from '@/services/slices/book';
import { combineReducers, configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

// Редьюсеры, которые должны быть персистентными
const persistReducers = combineReducers({
    book: bookReducer,
});

// Конфигурация для персистентного редьюсера
const persistConfig = {
    key: 'root',
    storage,
};

// Персистентный редьюсер
const persistedReducer = persistReducer(persistConfig, persistReducers);

// Корневой редьюсер, объединяющий персистентные и не персистентные редьюсеры
const rootReducer = combineReducers({
    persisted: persistedReducer,
});

// Создание хранилища
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Персистор для управления персистентным состоянием
export const persistor = persistStore(store);

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;