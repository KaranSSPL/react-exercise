import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
    history: string[];
};

const initialState: CurrencyState = {
    amount: 1,
    fromCurrency: 'INR',
    toCurrency: 'USD',
    history: []
};

export const slice = createSlice({
    name: 'conversion',
    initialState,
    reducers: {
        setAmount(state, action: PayloadAction<number>) {
            state.amount = action.payload;
        },
        setFromCurrency(state, action: PayloadAction<string>) {
            state.fromCurrency = action.payload;
        },
        setToCurrency(state, action: PayloadAction<string>) {
            state.toCurrency = action.payload;
        },
        addToHistory(state, action: PayloadAction<string>) {
            state.history.unshift(action.payload);
        },
        clearHistory(state) {
            state.history = [];
        }
    }
});

export const { setAmount, setFromCurrency, setToCurrency, addToHistory, clearHistory } = slice.actions;

export default slice.reducer