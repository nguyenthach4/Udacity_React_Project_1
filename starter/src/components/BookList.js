import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const BookList = ({ currentlyReading, wantToRead, read, updateShelf }) => {
  return (
    <div>
      <BookShelf
        title={"Currently Reading"}
        books={currentlyReading}
        updateShelf={updateShelf}
      />
      ,
      <BookShelf
        title={"Want to Read"}
        books={wantToRead}
        updateShelf={updateShelf}
      />
      ,
      <BookShelf title={"Read"} books={read} updateShelf={updateShelf} />
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookList;
