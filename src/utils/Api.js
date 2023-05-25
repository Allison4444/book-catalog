import { collection, addDoc, getDocs, deleteDoc, query, where } from "firebase/firestore";
import db from './firebase';

export async function getBooks() {
  const querySnapshot = await getDocs(collection(db, "books"));
  const bookList = [];
  querySnapshot.forEach((doc) => {
    bookList.push(doc.data())
  });

  return bookList;
}

export async function createBook(newBook) {
  try {
    const docRef = await addDoc(collection(db, "books"), {
      id: newBook.id,
      authors: newBook.authors,
      isbn: newBook.isbn,
      rating: newBook.rating,
      title: newBook.title,
      year: newBook.year
    });

    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function removeBook(book) {
  try {
    const booksCollectionRef = collection(db, 'books');

    const q = query(
      booksCollectionRef,
      where('id', '==', book.id)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}
