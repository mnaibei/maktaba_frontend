import { useEffect, useRef } from "react";
import { View, Text, Button } from "react-native"; // Assuming you have imported Button
import ePub from "epubjs";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookContent } from "../redux/books/bookSlice";

function BookDetails({ route }) {
    const { bookId, bookTitle } = route.params;

    const dispatch = useDispatch();
    const bookContent = useSelector((state) => state.books.selectedBookContent);

    const renditionRef = useRef(null);

    useEffect(() => {
        dispatch(fetchBookContent(bookId));
    }, [dispatch, bookId]);

    if (!bookContent) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Render the book details here
    return (
        <View>
            <Text>{bookTitle}</Text>
            {/* Render the book content or other book details */}
            {/* For example, you can display bookMetadata.title, author, etc. */}
            <Text>Title: {bookContent.title}</Text>
            <Text>Author: {bookContent.author}</Text>
            <Text>Publish Date: {bookContent.publish_date}</Text>
            <div id="epub-container"></div>
            <Button title="Previous Page" onPress={() => renditionRef.current.prev()} />
            <Button title="Next Page" onPress={() => renditionRef.current.next()} />
        </View>
    );
}

export default BookDetails;
