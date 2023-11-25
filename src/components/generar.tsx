import Box from "./box";
import "../style/generar.css"
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

    async function getUser(rut: string) {
        const response = await tauri.invoke('getuser', {rut: rut});
        console.log("Respuesta: ",response);
        if (!response) {
            return true;
        }
    }

    async function handleLoad(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        const rut = data.get('rut');
        const nombrelibro = data.get('nombrelibro');
        const isbn = data.get('isbn');
        const fechaprestamo = data.get('fechaprestamo');
        const terminoprestamo = data.get('terminoprestamo');
        const rutbibliotecario = data.get('rutbibliotecario');
        
        let uBool = await getUser(rut as string);
        console.log("Bool",uBool);
        if (uBool) {
            openModalU();
        }

        const prestamo = {
            rut,
            nombrelibro,
            isbn,
            fechaprestamo,
            terminoprestamo,
            rutbibliotecario,
        };
        console.log(prestamo);
        await tauri.invoke('addloan', {rutusuario: rut, nombrelibro: nombrelibro, isbn: isbn, fechaprestamo: fechaprestamo, terminoprestamo: terminoprestamo, rutbibliotecario: rutbibliotecario}).then((res) => {
            console.log(res);
        });

    }



    return (
        <Box>
            <form className="generarPrestamo" onSubmit={handleLoad}>
                <input type="text" name="rut" id="" placeholder="Rut Usuario"/>
                <input type="text" name="nombrelibro" id="" placeholder="Nombre Libro"/>
                <input type="text" name="isbn" id="" placeholder="ISBN"/>
                <input type="date" name="fechaprestamo" id="" placeholder="Fecha Prestamo"/>
                <input type="date" name="terminoprestamo" id="" placeholder="Termino de Prestamo"/>
                <input type="text" name="rutbibliotecario" id="" placeholder="Rut Bibliotecario"/>
                <button type="submit" className="Generar">Generar</button>
            </form>
            <ModalUser isOpenU={isModalUOpen} onCloseU={closeModalU}/>
        </Box>
    );
}

export default Generar;