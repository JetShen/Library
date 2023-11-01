import "../style/book.css"

function Book({ title, category, imageUrl }:{ title: string, category: string, imageUrl: string }) {
  return (
    <div className="book">
      <img src={imageUrl} alt={`Portada de ${title}`} />
      <p>{title}</p>
      <span>{category}</span>
    </div>
  );
}

export default Book;