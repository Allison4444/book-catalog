import { useState, useEffect } from "react";

function useValidationForm(initialState) {
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      let errors = {};
      let isValid = true;

      if (initialState.title.trim().length < 2 || initialState.title.length > 100) {
        errors.title = "Название книги должно содержать от 2 до 100 символов";
        isValid = false;
      }

      if (initialState.authors.trim().length < 2) {
        errors.authors = "Укажите хотя бы одного автора книги";
        isValid = false;
      }

      if (initialState.year && (initialState.year < 1800 || initialState.year > new Date().getFullYear())) {
        errors.year = "Укажите год публикации в диапазоне от 1800 до текущего года";
        isValid = false;
      }

      if (initialState.rating && (initialState.rating < 0 || initialState.rating > 10)) {
        errors.rating = "Укажите рейтинг в диапазоне от 0 до 10";
        isValid = false;
      }

      if ((initialState.isbn &&
        !/^\d{3}-\d-\d{3}-\d{5}-\d$/.test(initialState.isbn)) &&
      (initialState.isbn &&
        !/^\d{3}-\d-\d{2}-\d{6}-\d$/.test(initialState.isbn)) &&
      (initialState.isbn &&
        !/^\d{3}-\d-\d{4}-\d{4}-\d$/.test(initialState.isbn))) {
        errors.isbn = "Введите ISBN в правильном формате";
        isValid = false;
      }

      setFormErrors(errors);
      setIsFormValid(isValid);
    };

    validateForm();
  }, [initialState]);

  return { formErrors, isFormValid };
}

export default useValidationForm;
