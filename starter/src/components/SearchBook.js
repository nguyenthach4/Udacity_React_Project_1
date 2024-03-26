import { useState, useEffect } from "react";
import { getAll, search, update } from "../BooksAPI";
import PropTypes from "prop-types";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchBook = ({
  booksSearch,
  setBooksSearch,
  updateShelf,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getBookSearchByKeywork = (keywork) => {
    if (0 == keywork.length) {
      setBooksSearch([]);
      return;
    }

    search(keywork, 0).then((result) => {
      if (result?.items?.length == 0) {
        setBooksSearch([]);
        return;
      }

      getAll().then((bookLst) => {
        const books = result.map((item) => {
          const book = bookLst.find((book) => book.id == item.id);
          if (book != undefined) {
            return book;
          }

          return { ...item, shelf: "none" };
        });

        setBooksSearch(books);
      });
    });
  };

  const handleSearchBookByKeywork = (event) => {
    const condition = event.target.value;
    setSearchQuery(condition);
  };

  useEffect(() => {
    getBookSearchByKeywork(searchQuery);
  }, [searchQuery]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={(event) => handleSearchBookByKeywork(event)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {booksSearch &&
            booksSearch.map((book) => (
              <li key={book.id}>
                <Book key={book.id} book={book} updateShelf={updateShelf} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

SearchBook.propTypes = {
  booksSearch: PropTypes.array.isRequired,
  setBooksSearch: PropTypes.func.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default SearchBook;
