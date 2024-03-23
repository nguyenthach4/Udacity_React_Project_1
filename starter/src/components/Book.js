import PropTypes from "prop-types";

const Book = ({book, updateShelf}) => {
  const shelves = [
    {id: 1, name: "currentlyReading", displayName: "Currently Reading"},
    {id: 2, name: "wantToRead", displayName: "Want to Read"},
    {id: 3, name: "read", displayName: "Read"},
    {id: 4, name: "none", displayName: "None"},
  ];

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url(${book.imageLinks && (book.imageLinks["thumbnail"] || book.imageLinks["smallThumbnail"])})`,
          }}>
        </div>
        
        <div className="book-shelf-changer">
          <select
            value={book.shelf} 
            onChange={(event) => updateShelf(event, book)}>

            <option value="moveTo" disabled>{"Move to..."}</option>

            {shelves.map(shelf => (
              <option key={shelf.id} value={shelf.name}>{shelf.displayName}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Book;
