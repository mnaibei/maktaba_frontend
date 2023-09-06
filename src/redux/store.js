import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./books/bookSlice";

export default configureStore({
  reducer: {
    books: booksReducer,
  },
});
