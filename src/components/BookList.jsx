import { useState } from "react";
import Book from "./Book";
import useBookSorting from "../hooks/useBookSorting";
import Button from "./UI/button/Button";

function BookList({ books, title, remove }) {
  const [groupedBy, setGroupedBy] = useState('years');

  const { groupedBooksByYears,
    years,
    groupedBooksByRating,
    rating,
    groupedBooksByAuthors,
    authors,
    randomRecommendedBook } = useBookSorting(books);

  function checkGroupedBy() {
    if (groupedBy === 'authors') return [authors, groupedBooksByAuthors] ;
    if (groupedBy === 'rating') return [rating, groupedBooksByRating];
    return [years, groupedBooksByYears];
  }
  const groupName = checkGroupedBy();

  return (
    <div className="page__book-list">
      <h3 className="page__group-title">Группировать книги:</h3>
      <div className="page__sort-buttons">
        <Button onClick={() => setGroupedBy('rating')} >По рейтингу</Button>
        <Button onClick={() => setGroupedBy('authors')} >По автору</Button>
        <Button onClick={() => setGroupedBy('years')} >По году</Button>
      </div>
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
      {groupName[0].map((year) => (
        <div key={year}>
          <h2 className="page__group-title">{year}</h2>
          {groupName[1][year].map((book) => (
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
