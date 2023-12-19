import { tauri } from '@tauri-apps/api';
import { currenPath } from '../script/gobal';
import '../style/modalBook.css';
import { useEffect, useState } from 'react';
import { convertFileSrc } from '@tauri-apps/api/tauri';

type ModalBook = {
    titulo: string;
    urlportada: string;
    categoria: string;
    autor: string;
    sinopsis: string;
    numerocopias: number;
    ubicacion: string;
}

function BookModal( { Book, isOpen, onClose }:{Book:ModalBook,isOpen:boolean, onClose:()=>void}){
    if (!isOpen) return null;
    const [backgroundStyle, setBackgroundStyle] = useState<string>('');

    const listCategoria = Book.categoria[0].split(',');
    

    const handleExist = async () => {
        try {
          const mainPath = await currenPath;
          const res = await tauri.invoke('verifypath', { path: Book.urlportada });
          if (res === true) {
            setBackgroundStyle(() => `url(${convertFileSrc(mainPath+'/books/' + Book.urlportada)})`);
          } else {
            console.warn("Image not found. Showing default image.");
            setBackgroundStyle(() => `url(/books/default.png)`);
          }
        } catch (error) {
          console.error("Error verifying the existence of the image:", error);
        }
      };
    
      useEffect(() => {
        handleExist();
      }, [Book.urlportada]);

    return(
        <>
            <div className="modal-overlay-book">
                <div className="modal-content-book">
                    <div className="modal-header">
                        <span className="close" onClick={onClose}>&times;</span>
                    </div>
                    <div className="modal-body-book">
                        <span className="imgdiv" style={{ backgroundImage: backgroundStyle }}>
                        </span>
                        <div className="content">
                            <span className='span-header'>
                                <h1>{Book.titulo}</h1>
                                <h6>Cantidad: {Book.numerocopias}</h6>
                            </span>
                            <span className="minitext">
                                <p><strong>Autor:</strong> {Book.autor}</p>
                                <p><strong>Ubicación:</strong> {Book.ubicacion}</p>
                            </span>
                            <div className='Listacategorias' >
                                <h4>Categorías:</h4>
                                {listCategoria.map((category, index) => (
                                    <p key={index}>{category}</p>
                                ))}
                            </div>
                            <div className="sinopsis">
                                <h3>Sinopsis</h3>
                                <p>{Book.sinopsis}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookModal;

