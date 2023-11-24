import Box from "./box";
import "../style/buscar.css"
import Book from "./book";


const books = [
    {
      title: 'jasjdaksdka asdasd asdasd as asd',
      category: 'Ficción',
      imageUrl: '/books/Python.jpg',
    },
    {
      title: 'Libro 2',
      category: 'No ficción',
      imageUrl: 'url_de_la_imagen_2.jpg',
    },
    {
        title: 'Libro 3',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_3.jpg',
    },
    {
        title: 'Libro 4',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_4.jpg',
      },
    {
        title: 'Libro 5',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_5.jpg',
    },
    {
        title: 'Libro 6',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_6.jpg',
    },
    {
        title: 'Libro 7',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_7.jpg',
    },
    {
        title: 'Libro 8',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_8.jpg',
    },
    {
        title: 'Libro 9',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_9.jpg',
    },
    {
        title: 'Libro 10',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_10.jpg',
    },
    {
        title: 'Libro 7',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_7.jpg',
    },
    {
        title: 'Libro 8',
        category: 'No ficción',
        imageUrl: 'url_de_la_imagen_8.jpg',
    },
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
            <div className="book-box">
                <ul className="book-list">
                    {books.map((book, index) => (
                        <Book
                        key={index}
                        title={book.title}
                        category={book.category}
                        imageUrl={book.imageUrl}
                        />
                    ))}
                </ul>
            </div>
            <div className="search-box">
                <div className="boxQuery">
                    <input type="text" name="query" id="query" className="Query" placeholder="Escriba el nombre del Libro"/>
                    <button className="addBook">Añadir Libro</button>
                </div>
                <div className="categoryBox">
                    <ul className="categoryList">
                        <button className="categoryItem" value="Ficcion">Ficción</button>
                        <button className="categoryItem" value="NoFiccion">No ficción</button>
                        <button className="categoryItem" value="Terror">Terror</button>
                        <button className="categoryItem" value="Romance">Romance</button>
                        <button className="categoryItem" value="Aventura">Aventura</button>
                        <button className="categoryItem" value="Fantasia">Fantasía</button>
                        <button className="categoryItem" value="CienciaFiccion">Ciencia ficción</button>
                        <button className="categoryItem" value="Infantil">Infantil</button>
                        <button className="categoryItem" value="Juvenil">Juvenil</button>
                        <button className="categoryItem" value="Misterio">Misterio</button>
                        <button className="categoryItem" value="Poesia">Poesía</button>
                        <button className="categoryItem" value="Biografia">Biografía</button>
                        <button className="categoryItem" value="Autoayuda">Autoayuda</button>
                        <button className="categoryItem" value="Cocina">Cocina</button>
                        <button className="categoryItem" value="Historia">Historia</button>
                        <button className="categoryItem" value="Economia">Economía</button>
                        <button className="categoryItem" value="Politica">Política</button>
                        <button className="categoryItem" value="Arte">Arte</button>
                        <button className="categoryItem" value="Religion">Religión</button>
                        <button className="categoryItem" value="Deportes">Deportes</button>
                        <button className="categoryItem" value="Viajes">Viajes</button>
                        <button className="categoryItem" value="Otros">Otros</button>
                    </ul>
                </div>
            </div>
        </Box>
    );
}


export default Buscarlibro;