import React, { useState, useEffect } from 'react';
import Box from "./box";
import Book from "./book";
import Modal from './modal'; 
import { tauri } from '@tauri-apps/api';
import "../style/buscar.css"

type Book = {
    titulo: string;
    categoria: string;
    urlportada: string;
};

function Buscarlibro() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [Listbooks, setBooks] = useState<Book[]>([]);
  const [isDatabaseReady, setDatabaseReady] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function getBooks() {
    try {
      const res = await tauri.invoke<Book[]>('getallbooks');
      console.log("Res", res);
      setBooks(res);
    } catch (error) {
      console.error('Error querying database:', error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDatabaseReady(true);
    }, 125); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDatabaseReady) {
      getBooks();
    }
  }, [isDatabaseReady]);
  return(
    <Box>
        <div className="book-box">
            <ul className="book-list">
                {Listbooks.map((book, index) => (
                    <Book
                    key={index}
                    title={book.titulo}
                    category={book.categoria}
                    imageUrl={book.urlportada}
                    />
                ))}
            </ul>
        </div>
        <div className="search-box">
            <div className="boxQuery">
                <input type="text" name="query" id="query" className="Query" placeholder="Escriba el nombre del Libro"/>
                <button className="addBook" onClick={openModal}>Añadir Libro</button>
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
        <Modal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
);
}

export default Buscarlibro;
