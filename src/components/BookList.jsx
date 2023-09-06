// components/BookList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/books/bookSlice";
import { View, Text, TouchableOpacity } from "react-native";


function BookList({ navigation }) {
    const dispatch = useDispatch();
    const { books } = useSelector((state) => state.books);
    console.log(books);

    const status = useSelector((state) => state.books.status);
    const error = useSelector((state) => state.books.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBooks());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (status === "failed") {
        return (
            <View>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View>
            {books.map((book) => (
                <TouchableOpacity
                    key={book.id}
                    onPress={() =>
                        navigation.navigate("BookDetails", {
                            bookId: book.id,
                            bookTitle: book.title,
                        })
                    }
                >
                    <Text>{book.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default BookList;
