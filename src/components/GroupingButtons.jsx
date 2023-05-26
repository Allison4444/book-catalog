import Button from "./UI/button/Button";

function GroupingButtons({ setGroupedBy, title }) {
  return (
    <>
      <h3 className="page__group-title">{title}</h3>
        <div className="page__sort-buttons">
          <Button onClick={() => setGroupedBy('rating')} >По рейтингу</Button>
          <Button onClick={() => setGroupedBy('authors')} >По автору</Button>
          <Button onClick={() => setGroupedBy('years')} >По году</Button>
        </div>
    </>
  )
}

export default GroupingButtons;
