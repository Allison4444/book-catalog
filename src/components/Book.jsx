import Button from "./UI/button/Button";

function Book(props) {
  return (
    <div className="book">
      <div className="book__content">
        <h2 className="book__title">{props.title}</h2>
        <p className="book__info">Авторы: {props.authors}</p>
        <p className="book__info">{props.year && `Год издания: ${props.year}`}</p>
        <p className="book__info">{props.rating ? `Рейтинг: ${props.rating}` : `Рейтинг: 0`}</p>
        <p className="book__info">{props.isbn && `ISBN: ${props.isbn}`}</p>
      </div>
      <div>
        <Button onClick={() => props.remove(props.book)} disabled={false} >
          Удалить
        </Button>
      </div>
    </div>
  )
}

export default Book;
