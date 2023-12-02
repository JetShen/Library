import Box from "./box";
import "../style/generar.css";
import { tauri } from '@tauri-apps/api';
import { useState } from 'react';
import ModalUser from "./modaluser";

function Generar() {
  const [isModalUOpen, setModalUOpen] = useState(false);

  const openModalU = () => {
    setModalUOpen(true);
  };

  const closeModalU = () => {
    setModalUOpen(false);
  };

  async function getUser(rut: string): Promise<boolean> {
    try {
      const response = await tauri.invoke('getuser', { rut: rut });
      console.log("Respuesta: ", response);
      return !!response;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      return false;
    }
  }

  const validarFechas = (dateA: Date | null, dateB: Date | null) => {
    if (dateA && dateB && dateA > dateB) {
      return false;
    }
    return true;
  };

  async function handleLoad(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);
    const rut = data.get('rut') as string;

    const userExists = await getUser(rut);
    console.log("Bool User", userExists);

    const boolDate = validarFechas(new Date(data.get('fechaprestamo') as string), new Date(data.get('terminoprestamo') as string));
    console.log("Bool Date", boolDate);
    if (!boolDate) {
      alert("La fecha de termino de préstamo no puede ser menor a la fecha de inicio de préstamo.");
      return;
    }

    console.log("continua")

    if (!userExists) {
      openModalU();
      return;
    }

    const prestamo = {
      rut,
      nombrelibro: data.get('nombrelibro') as string,
      isbn: data.get('isbn') as string,
      fechaprestamo: data.get('fechaprestamo') as string,
      terminoprestamo: data.get('terminoprestamo') as string,
      rutbibliotecario: data.get('rutbibliotecario') as string,
    };

    console.log(prestamo);
    try {
        await tauri.invoke('addloan', { rutusuario: prestamo.rut, nombrelibro: prestamo.nombrelibro, isbn: prestamo.isbn, fechaprestamo: prestamo.fechaprestamo, terminoprestamo: prestamo.terminoprestamo, rutbibliotecario: prestamo.rutbibliotecario });

        console.log("Préstamo agregado exitosamente.");
    } catch (error) {
      console.error("Error al agregar préstamo:", error);
    }
  }

  return (
    <Box>
      <form className="generarPrestamo" onSubmit={handleLoad}>
        <input type="text" name="rut" placeholder="Rut Usuario" />
        <input type="text" name="nombrelibro" placeholder="Nombre Libro" />
        <input type="text" name="isbn" placeholder="ISBN" />
        <input type="date" name="fechaprestamo" placeholder="Fecha Prestamo" />
        <input type="date" name="terminoprestamo" placeholder="Termino de Prestamo" />
        <input type="text" name="rutbibliotecario" placeholder="Rut Bibliotecario" />
        <button type="submit" className="Generar">Generar</button>
      </form>
      <ModalUser isOpenU={isModalUOpen} onCloseU={closeModalU} />
    </Box>
  );
}

export default Generar;
