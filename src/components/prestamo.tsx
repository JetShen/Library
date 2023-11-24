import { useState, useEffect } from 'react';
import { tauri } from '@tauri-apps/api';
import { currenPath } from '../script/gobal';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import '../style/prestamo.css';

// rut, titulo, isbn, fechaTermino

function Prestamo({rut, titulo, fechaTermino, imageUrl} : {rut: string, titulo: string, fechaTermino: string, imageUrl: string } ) {
  const [backgroundStyle, setBackgroundStyle] = useState<string>('');

  const handleExist = async () => {
    try {
      const mainPath = await currenPath;
      const res = await tauri.invoke('verifypath', { path: imageUrl });
      if (res === true) {
        setBackgroundStyle(`url(${convertFileSrc(mainPath + imageUrl)})`);
      } else {
        console.warn("Image not found. Showing default image.");
        setBackgroundStyle(`url(${convertFileSrc(mainPath + '/books/default.png')})`);
      }
    } catch (error) {
      console.error("Error verifying the existence of the image:", error);
    }
  };

  useEffect(() => {
    handleExist();
  }, []);

  return (
    <div className="item" style={{ backgroundImage: backgroundStyle }}>
      <div className="info-prestamo">
        <p className='titulo'>{titulo}</p>
        <span className='inner-Info'>
          <p className='rut'>Rut:{rut}</p>
          <p className='fecha'>Fecha:{fechaTermino}</p>
        </span>
        <button className='btnDevolver'>Devolver</button>
      </div>
    </div>
  );
}

export default Prestamo;
