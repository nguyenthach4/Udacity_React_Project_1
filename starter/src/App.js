import "./App.css";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";
import { Route, Routes } from "react-router-dom";
import SearchBook from "./components/SearchBook";
import BookList from "./components/BookList";

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
        element={
          <BookList
            currentlyReading={currentlyReading}
            wantToRead={wantToRead}
            read={read}
            updateShelf={updateShelf}
          ></BookList>
        }
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
