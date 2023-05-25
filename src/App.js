import { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { getBooks, createBook, removeBook } from './utils/Api';
import Loader from './components/UI/loader/Loader';

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchingBooks() {
      try {
        setIsLoading(true);
        const bookList = await getBooks();
        setBooks(bookList);
      } catch (e) {
        console.error("Error fetching books: ", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchingBooks();
  }, [])

  async function handleCreateBook(newBook) {
    try {
      const docRef = await createBook(newBook);
      setBooks([...books, newBook]);
    } catch (e) {
      console.error("Error adding book: ", e);
    }
  }

  async function handleRemoveBook(book) {
    try {
      await removeBook(book);
      setBooks(books.filter(b => b.id !== book.id));
    } catch (e) {
      console.error("Error deleting book: ", e);
    }
  }

  return (
    <div className='page'>
      <BookForm create={handleCreateBook} />
      {books.length !== 0
        ?
        (<BookList remove={handleRemoveBook} books={books} title="Книги" />)
        :
        (isLoading ? <Loader /> : <h1 className="page__title">Список книг пуст!</h1>)
      }
    </div>
  );
}

export default App;
