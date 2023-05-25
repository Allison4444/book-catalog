import Book from "./Book";
import useBookSorting from "../hooks/useBookSorting";

function BookList({ books, title, remove }) {
  const { groupedBooks, years, randomRecommendedBook } = useBookSorting(books);

  return (
    <div className="page__book-list">
      <h1 className="page__title">{title}</h1>
      {randomRecommendedBook &&
      (
        <div>
          <h2 className="page__group-title">Рекомендуемая книга</h2>
          <Book
            remove={remove}
            book={randomRecommendedBook}
            key={randomRecommendedBook.id}
            title={randomRecommendedBook.title}
            authors={randomRecommendedBook.authors}
            year={randomRecommendedBook.year}
            rating={randomRecommendedBook.rating}
            isbn={randomRecommendedBook.isbn}
          />
        </div>
      )
      }
      {years.map((year) => (
        <div key={year}>
          <h2 className="page__group-title">{year}</h2>
          {groupedBooks[year].map((book) => (
            <Book
              remove={remove}
              book={book}
              key={book.id}
              title={book.title}
              authors={book.authors}
              year={book.year}
              rating={book.rating}
              isbn={book.isbn}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default BookList;
