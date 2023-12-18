import { useState, useEffect } from 'react';
import Box from "./box";
import Book from "./book";
import Modal from './modal';
import { tauri } from '@tauri-apps/api';
import "../style/buscar.css";

type BookType = {
  titulo: string;
  urlportada: string;
};

const categoryList = ["Ficcion", "NoFiccion", "Terror", "Romance", "Aventura", "Fantasia", "CienciaFiccion", "Infantil", "Juvenil", "Misterio", "Poesia", "Biografia", "Autoayuda", "Cocina", "Historia", "Economia", "Politica", "Arte", "Religion", "Deportes", "Viajes", "Otros"];

function Buscarlibro({ BoolDB }: { BoolDB: Boolean }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [Listbooks, setBooks] = useState<BookType[]>([]);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const openModal = () => {
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
  };

  async function getBooks() {
    try {
      const res = await tauri.invoke<BookType[]>('getallbooks');
      console.log(res);
      setBooks(res);
    } catch (error) {
      alert("Error al cargar libros");
      console.error('Error querying database:', error);
    }
  }



  useEffect(() => {
    if (query !== '') {
      const fetchData = async () => {
        try {
          const queryBook = await tauri.invoke<BookType[]>('getbook', { titulo: query });
          console.log("Test \n", queryBook);
          setBooks(queryBook);
        } catch (error) {
          console.error('Error searching book:', error);
        }
      };
      fetchData();
    }
  }, [query]);

  function captureEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const query = (document.getElementById("query") as HTMLInputElement).value;
      setQuery(query);
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  useEffect(() => {
    if (BoolDB) {
      const fetchData = async () => {
        try {
          if(selectedCategories.length>=1) {
              const res = await tauri.invoke<BookType[]>('getbookbycategory', { categorias: selectedCategories });
              console.log("categorias query \n", res);
              setBooks(res);
            return;
          }else{
              getBooks(); 
            return;
          }
        } catch (error) {
          console.error('Error searching book:', error);
        }
      };
      fetchData();
    }
  }, [selectedCategories, BoolDB]);


  return (
    <Box>
      <div className="book-box">
        <ul className="book-list">
          {Listbooks.map((book) => (
            <Book
              key={book.urlportada}
              title={book.titulo}
              imageUrl={book.urlportada}
            />
          ))}
        </ul>
      </div>
      <div className="search-box">
        <div className="boxQuery">
          <input
            type="text"
            name="query"
            id="query"
            className="Query"
            placeholder="Escriba el nombre del Libro"
            onKeyDown={captureEnter}
          />
          <button className="addBook" onClick={openModal}>
            Añadir Libro
          </button>
        </div>
        <div className="categoryBox">
          <ul className="categoryList">
            {categoryList.map((category) => (
              <button
                key={category}
                className={`categoryItem ${selectedCategories.includes(category) ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </ul>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </Box>
  );
}

export default Buscarlibro;
