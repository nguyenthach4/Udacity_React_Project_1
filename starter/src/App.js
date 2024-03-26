import "./App.css";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import { Route, Routes } from "react-router-dom";
import SearchBook from "./components/SearchBook";
import OpenSearch from "./components/OpenSearch";

function App() {
  const [books, setBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [booksSearch, setBooksSearch] = useState([]);

  useEffect(() => {
    getAll().then((result) => {
      setBooks(result);
    });
  }, []);

  useEffect(() => {
    refreshBooks();
  }, [books]);

  const refreshBooks = () => {
    const currentlyReadingBooks = books.filter(
      (book) => book.shelf == "currentlyReading"
    );
    setCurrentlyReading(currentlyReadingBooks);

    const wantToReadBooks = books.filter((book) => book.shelf == "wantToRead");
    setWantToRead(wantToReadBooks);

    const readBooks = books.filter((book) => book.shelf == "read");
    setRead(readBooks);
  };

  const updateShelf = (event, book) => {
    const selectedShelf = event.target.value;

    update(book, selectedShelf).then((result) => {
      setBooks([
        ...books.filter((b) => b.id !== book.id),
        { ...book, shelf: selectedShelf },
      ]);
    });
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={[
          <BookShelf
            title={"Currently Reading"}
            books={currentlyReading}
            updateShelf={updateShelf}
          />,

          <BookShelf
            title={"Want to Read"}
            books={wantToRead}
            updateShelf={updateShelf}
          />,
          <BookShelf title={"Read"} books={read} updateShelf={updateShelf} />,
          <OpenSearch></OpenSearch>
        ]}
      />
      <Route
        path="/search"
        element={
          <SearchBook
            booksSearch={booksSearch}
            setBooksSearch={setBooksSearch}
            updateShelf={updateShelf}
          />
        }
      />
    </Routes>
  );
}

export default App;
