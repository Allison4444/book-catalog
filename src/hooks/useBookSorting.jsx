import { useState, useEffect } from "react";

function useBookSorting(books) {
  const [groupedBooks, setGroupedBooks] = useState({});
  const [years, setYears] = useState([]);
  const [randomRecommendedBook, setRandomRecommendedBook] = useState(null);

  useEffect(() => {
    const sorted = [...books].sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );

    const grouped = sorted.reduce((grouped, book) => {
      const year = book.year || "Книги без указания года";
      grouped[year] = grouped[year] || [];
      grouped[year].push(book);
      return grouped;
    }, {});
    setGroupedBooks(grouped);

    const sortedYears = Object.keys(grouped).sort((a, b) => {
      if (a === "Книги без указания года") return 1;
      if (b === "Книги без указания года") return -1;
      return parseInt(b) - parseInt(a);
    });
    setYears(sortedYears);

    const timeTestedBooks = sorted.filter(
      (book) => book.year !== "" && new Date().getFullYear() - book.year >= 3
    );

    const recommendedBooks = timeTestedBooks.filter((book) => +book.rating === Math.max(...timeTestedBooks.map((book) => book.rating))
    );

    const randomBook = recommendedBooks[Math.floor(Math.random() * recommendedBooks.length)];
    setRandomRecommendedBook(randomBook);
  }, [books]);

  return { groupedBooks, years, randomRecommendedBook };
}

export default useBookSorting;
