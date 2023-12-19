import { useState, useEffect } from 'react';
import { tauri } from '@tauri-apps/api';
import { currenPath } from '../script/gobal';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import '../style/prestamo.css';


function Prestamo({idPrestamo , rut, titulo, fechaTermino, imageUrl, setRmvID } 
                      : 
                  {idPrestamo:number ,rut: string, titulo: string, fechaTermino: string, imageUrl: string, setRmvID: any } ) {
  const [backgroundStyle, setBackgroundStyle] = useState<string>('');

  const handleExist = async () => {
    try {
      const mainPath = await currenPath;
      const res = await tauri.invoke('verifypath', { path: imageUrl });
      if (res === true) {
        setBackgroundStyle(`url(${convertFileSrc(mainPath+'/books/'  + imageUrl)})`);
      } else {
        console.warn("Image not found. Showing default image.");
        setBackgroundStyle(`url(/books/default.png)`);
      }
    } catch (error) {
      console.error("Error verifying the existence of the image:", error);
    }
  };

  useEffect(() => {
    handleExist();
  }, [imageUrl]);

  const eliminarPrestamo = async () => {
    try {
      const res = await tauri.invoke('removeloan', { idprestamo: idPrestamo });
      alert("Préstamo eliminado correctamente.");
      setRmvID(idPrestamo);
    } catch (error) {
      alert("Error al eliminar préstamo.");
      console.error("Error al eliminar préstamo:", error);
    }
  };

  return (
    <div className="item" style={{ backgroundImage: backgroundStyle }}>
      <div className="info-prestamo">
        <p className='titulo'>{titulo}</p>
        <span className='inner-Info'>
          <p className='rut'>Rut:{rut}</p>
          <p className='fecha'>Fecha:{fechaTermino}</p>
        </span>
        <button className='btnDevolver' onClick={eliminarPrestamo} >Devolver</button>
      </div>
    </div>
  );
}

export default Prestamo;
