import type { BookState } from "./initialState";

export const selectBook = (state: { persisted: { book: BookState } }) => state.persisted.book;