import { useState } from "react";
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";
import Label from "./UI/label/Label";
import useValidationForm from '../hooks/useValidationForm';
import ErrorSpan from "./UI/errorSpan/ErrorSpan";

function BookForm({ create }) {
  const [formValues, setFormValues] = useState({
    title: '',
    authors: '',
    year: '',
    rating: '',
    isbn: ''
  });

  const { formErrors, isFormValid } = useValidationForm(formValues);

  function addNewBook(e) {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    const newBook = {
      ...formValues,
      id: Date.now(),
    };

    create(newBook);

    setFormValues({
      title: '',
      authors: '',
      year: '',
      rating: '',
      isbn: '',
    });
  }

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: value,
    }));
  };

  return (
    <>
      <h2 className="page__title">Добавить новую книгу</h2>
      <form className="form" noValidate>
        <Label labelFor="title">Название книги *</Label>
        <Input
          value={formValues.title}
          onChange={(e) => handleInputChange(e, "title")}
          type="text"
          placeholder="Укажите название книги"
          required
          minLength={2}
          maxLength={100}
          id="title"
        />
        <ErrorSpan error={formErrors.title}>{formErrors.title}</ErrorSpan>
        <Label labelFor="authors">Автор(ы) *</Label>
        <Input
          value={formValues.authors}
          onChange={(e) => handleInputChange(e, "authors")}
          type="text"
          placeholder="Укажите автора(ов)"
          required
          minLength={2}
          id="authors"
        />
        <ErrorSpan error={formErrors.authors}>{formErrors.authors}</ErrorSpan>
        <Label labelFor="year">Год выпуска</Label>
        <Input
          value={formValues.year}
          onChange={(e) => handleInputChange(e, "year")}
          type="number"
          placeholder="Укажите год выпуска"
          min="1800"
          max={new Date().getFullYear()}
          id="year"
        />
        <ErrorSpan error={formErrors.year}>{formErrors.year}</ErrorSpan>
        <Label labelFor="rating">Рейтинг книги</Label>
        <Input
          value={formValues.rating}
          onChange={(e) => handleInputChange(e, "rating")}
          type="number"
          placeholder="Укажите рейтинг"
          min="0"
          max="10"
          id="rating"
        />
        <ErrorSpan error={formErrors.rating}>{formErrors.rating}</ErrorSpan>
        <Label labelFor="isbn">ISBN</Label>
        <Input
          value={formValues.isbn}
          onChange={(e) => handleInputChange(e, "isbn")}
          type="text"
          placeholder="Формат ISBN: xxx-x-xxxx-xxxx-x"
          id="isbn"
        />
        <ErrorSpan error={formErrors.isbn}>{formErrors.isbn}</ErrorSpan>
        <div className="form__save-button">
          <Button disabled={!isFormValid} type="submit" onClick={addNewBook}>
            Добавить книгу
          </Button>
        </div>
      </form>
    </>
  );
}

export default BookForm;
