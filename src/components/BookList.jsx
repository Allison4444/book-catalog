import { useState } from "react";
import Book from "./Book";
import useBookSorting from "../hooks/useBookSorting";
import Button from "./UI/button/Button";
import GroupingButtons from "./GroupingButtons";

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
      <GroupingButtons title='Группировать книги:' setGroupedBy={setGroupedBy} />
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
      {groupName[0].map((group) => (
        <div key={group}>
          <h2 className="page__group-title">{group}</h2>
          {groupName[1][group].map((book) => (
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
