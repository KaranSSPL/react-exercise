import { configureStore } from '@reduxjs/toolkit'
import slice from './slices/currencySlice'

const store = configureStore({
    reducer: {
        counter: slice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;