import { useState, useEffect } from 'react';
import Box from "./box";
import Book from "./book";
import Modal from './modal';
import BookModal from './modalBook';
import { tauri } from '@tauri-apps/api';
import "../style/buscar.css";

// type BookType = {
//   titulo: string;
//   urlportada: string;
  
// };



type ModalBook = {
  titulo: string;
  urlportada: string;
  categoria: string;
  autor: string;
  numerocopias: number;
  ubicacion: string;
}

const categoryList = ["Ficcion", "NoFiccion", "Terror", "Romance", "Aventura", "Fantasia", "CienciaFiccion", "Infantil", "Juvenil", "Misterio", "Poesia", "Biografia", "Autoayuda", "Cocina", "Historia", "Economia", "Politica", "Arte", "Religion", "Deportes", "Viajes", "Otros"];

const dummyBook: ModalBook = {
  titulo: '',
  urlportada: '',
  categoria: '',
  autor: '',
  numerocopias: 0,
  ubicacion: '',
};

function Buscarlibro({ BoolDB }: { BoolDB: Boolean }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalook, setModalBook] = useState(false);
  const [Listbooks, setBooks] = useState<ModalBook[]>([]);
  const [query, setQuery] = useState('');
  const [book, setBook] = useState<ModalBook>(dummyBook);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };


  const openBook = (book: ModalBook) =>{
    setModalBook(true);
    setBook(book);
  };
  const closeBook = () => {
    setModalBook(false);
  };

  async function getBooks() {
    try {
      const res = await tauri.invoke<ModalBook[]>('getallbooks');
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
          const queryBook = await tauri.invoke<ModalBook[]>('getbook', { titulo: query });
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
              const res = await tauri.invoke<ModalBook[]>('getbookbycategory', { categorias: selectedCategories });
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
          {Listbooks.map((book, index) => (
            <span  key={index} onClick={() =>openBook(book)}>
              <Book
              key={index}
              title={book.titulo}
              imageUrl={book.urlportada}
              />
            </span>
            
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
      <BookModal
        isOpen={modalook}
        onClose={closeBook}
        Book={book}
      />
    </Box>
  );
}

export default Buscarlibro;
