import "./App.css";
import { useEffect, useState } from "react";
import { getAll, update } from "./BooksAPI";
import BookShelf from "./components/BookShelf";
import SearchBook from "./components/SearchBook";

function App() {
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [read, setRead] = useState([]);
  const [booksSearch, setBooksSearch] = useState([]);

  useEffect(() => {
    getAll()
      .then(result => {
        setBooks(result);
      });
  }, []);

  useEffect(() => {
    refreshBooks();
  }, [books]);

  const refreshBooks = () => {
    const currentlyReadingBooks = books.filter(book => book.shelf == "currentlyReading");
    setCurrentlyReading(currentlyReadingBooks);

    const wantToReadBooks = books.filter(book => book.shelf == "wantToRead");
    setWantToRead(wantToReadBooks);

    const readBooks = books.filter(book => book.shelf == "read");
    setRead(readBooks);
  }

  const toggleShowSearchPage = () => {
    setShowSearchPage(!showSearchPage);
  }

  const updateShelf = (event, book) => {
    const selectedShelf = event.target.value;

    update(book, selectedShelf)
      .then(result => {
        if(showSearchPage) {
          const temp = booksSearch.map(b => (b.id == book.id ? {...b, shelf: selectedShelf} : b));
          setBooksSearch(temp);
        }

        setBooks([...books.filter((b) => b.id !== book.id), {...book, shelf: selectedShelf}]);
      });
  }

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBook
          booksSearch={booksSearch}
          setBooksSearch={setBooksSearch}
          toggleShowSearchPage={toggleShowSearchPage}
          updateShelf={updateShelf} />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                title={"Currently Reading"}
                books={currentlyReading}
                updateShelf={updateShelf} />

              <BookShelf
                title={"Want to Read"}
                books={wantToRead}
                updateShelf={updateShelf} />

              <BookShelf
                title={"Read"}
                books={read}
                updateShelf={updateShelf} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={toggleShowSearchPage}>{"Add a book"}</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
