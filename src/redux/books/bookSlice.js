import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ePub from "epubjs";

const initialState = {
  books: [],
  selectedBookContent: null,
  status: "idle",
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/books");
    const booksData = response.data;
    console.log(booksData);

    return booksData;
  } catch (error) {
    throw error;
  }
});

export const fetchBookContent = createAsyncThunk(
  "books/fetchBookContent",
  async (bookId) => {
    try {
      // Fetch the book details, including the EPUB3 binary content
      const response = await axios.get(
        `http://127.0.0.1:3000/books/${bookId}`,
        {
          responseType: "arraybuffer", // Ensure that the response is treated as binary data
        }
      );

      // Convert the binary data to a Blob
      const arrayBuffer = response.data;
      const blob = new Blob([arrayBuffer], { type: "application/epub+zip" });

      // Parse the EPUB content using epubjs
      const epub = ePub(blob);

      await epub.ready;

      console.log(epub);

      const packageData = epub.package;

      // debugger;

      console.log(packageData);

      const bookMetadata = {
        title: packageData.metadata.title,
        author: packageData.metadata.creator,
        publish_date: packageData.metadata.pubdate,
        cover: packageData.coverPath,
        // spine: packageData.spine[0],
        // Add other metadata fields as needed
      };

      // Return the extracted book metadata
      return bookMetadata;
    } catch (error) {
      throw error;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
        console.log(state.books);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookContent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedBookContent = action.payload;
        console.log(state.selectedBookContent);
      })
      .addCase(fetchBookContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
