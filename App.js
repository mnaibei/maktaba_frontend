// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppNavigator from "./AppNavigator"; // Update the import path
import BookDetails from "./src/components/BookDetails";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
