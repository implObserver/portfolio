import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialState, type BookState } from "./initialState";

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        resetState: () => {
            return initialState;
        },
        openBook: (state: BookState) => {
            state.isOpen = true
            state.isFinished = false
        },
        closeBook: (state: BookState, action: PayloadAction<boolean>) => {
            state.isOpen = false
            state.isFinished = action.payload
        },
        startAnimation: (state: BookState) => {
            state.isAnimating = true
        },
        endAnimation: (state: BookState) => {
            state.isAnimating = false
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            if (action.payload <= state.total_leave * 2 && action.payload >= -1)
                state.currentPage = action.payload;
        },
        setCurrentLeave: (state, action: PayloadAction<number>) => {
            if (action.payload <= state.total_leave && action.payload >= -1) {
                state.prevLeave = state.currentLeave;
                state.currentLeave = action.payload;
            }
        },
        setBookmark: (state, action: PayloadAction<boolean>) => {
            state.isBookmark = action.payload;
        },
    }
})

export const bookActions = bookSlice.actions;
export const bookReducer = bookSlice.reducer;