import { useState, useEffect } from "react";

function useBookSorting(books) {
  const [groupedBooksByYears, setGroupedBooksByYears] = useState({});
  const [groupedBooksByRating, setGroupedBooksByRating] = useState({});
  const [groupedBooksByAuthors, setGroupedBooksByAuthors] = useState({});
  const [years, setYears] = useState([]);
  const [rating, setRating] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [randomRecommendedBook, setRandomRecommendedBook] = useState(null);

  useEffect(() => {
    const sorted = [...books].sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );

    // Группировка по годам
    const groupedByYear = sorted.reduce((grouped, book) => {
      const year = book.year || "Книги без указания года";
      grouped[year] = grouped[year] || [];
      grouped[year].push(book);
      return grouped;
    }, {});
    setGroupedBooksByYears(groupedByYear);

    const sortedYears = Object.keys(groupedByYear).sort((a, b) => {
      if (a === "Книги без указания года") return 1;
      if (b === "Книги без указания года") return -1;
      return parseInt(b) - parseInt(a);
    });
    setYears(sortedYears);

    // Группировка по рейтингу
    const groupedByRating = sorted.reduce((grouped, book) => {
      const rating = +book.rating;
      grouped[rating] = grouped[rating] || [];
      grouped[rating].push(book);
      return grouped;
    }, {});
    setGroupedBooksByRating(groupedByRating);

    const sortedRating = Object.keys(groupedByRating).sort((a,b) => b - a);
    setRating(sortedRating);

    // Группировка по авторам
    const groupedByAuthors = sorted.reduce((grouped, book) => {
      const authors = book.authors;
      grouped[authors] = grouped[authors] || [];
      grouped[authors].push(book);
      return grouped;
    }, {})
    setGroupedBooksByAuthors(groupedByAuthors);

    const sortedAuthors = Object.keys(groupedByAuthors).sort((a, b) => a.trim().toLocaleLowerCase().localeCompare(b.trim().toLocaleLowerCase()));
    setAuthors(sortedAuthors);

    // Сортировка рекомендуемой книги
    const timeTestedBooks = sorted.filter(
      (book) => book.year !== "" && new Date().getFullYear() - book.year >= 3
    );

    const recommendedBooks = timeTestedBooks.filter((book) => +book.rating === Math.max(...timeTestedBooks.map((book) => book.rating))
    );

    const randomBook = recommendedBooks[Math.floor(Math.random() * recommendedBooks.length)];
    setRandomRecommendedBook(randomBook);
  }, [books]);

  return { groupedBooksByYears, years, groupedBooksByRating, rating, groupedBooksByAuthors, authors, randomRecommendedBook };
}

export default useBookSorting;
