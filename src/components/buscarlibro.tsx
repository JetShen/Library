import Box from "./box";
import "../style/buscar.css"
import Book from "./book";

const books = [
    {
      title: 'Libro 1',
      category: 'Ficción',
      imageUrl: 'url_de_la_imagen_1.jpg',
    },
    // {
    //   title: 'Libro 2',
    //   category: 'No ficción',
    //   imageUrl: 'url_de_la_imagen_2.jpg',
    // },
    // {
    //     title: 'Libro 3',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_3.jpg',
    // },
    // {
    //     title: 'Libro 4',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_4.jpg',
    //   },
    // {
    //     title: 'Libro 5',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_5.jpg',
    // },
    // {
    //     title: 'Libro 6',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_6.jpg',
    // },
    // {
    //     title: 'Libro 7',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_7.jpg',
    // },
    // {
    //     title: 'Libro 8',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_8.jpg',
    // },
    // {
    //     title: 'Libro 9',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_9.jpg',
    // },
    // {
    //     title: 'Libro 10',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_10.jpg',
    // },
    // {
    //     title: 'Libro 7',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_7.jpg',
    // },
    // {
    //     title: 'Libro 8',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_8.jpg',
    // },
    // {
    //     title: 'Libro 9',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_9.jpg',
    // },
    // {
    //     title: 'Libro 10',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_10.jpg',
    // },
    // {
    //     title: 'Libro 7',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_7.jpg',
    // },
    // {
    //     title: 'Libro 8',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_8.jpg',
    // },
    // {
    //     title: 'Libro 9',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_9.jpg',
    // },
    // {
    //     title: 'Libro 10',
    //     category: 'No ficción',
    //     imageUrl: 'url_de_la_imagen_10.jpg',
    // },
  ];



function Buscarlibro(){

    return(
        <Box>
            <article className="book-box">
            {books.map((book, index) => (
                <Book
                key={index}
                title={book.title}
                category={book.category}
                imageUrl={book.imageUrl}
                />
            ))}
            </article>
            <aside className="search-box">
                <input type="text" name="query" id="query" className="Query" placeholder="Escriba el nombre del Libro"/>
                <div className="category"></div>
            </aside>
        </Box>
    );
}


export default Buscarlibro;