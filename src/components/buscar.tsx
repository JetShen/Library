import Box from "./box";
import '../style/buscarPrestamo.css'
import Prestamo from "./prestamo";
import { tauri } from "@tauri-apps/api";
import { useState, useEffect } from "react";

type Prestamos = {
    idprestamo: number;
    isbn: string;
    nombrelibro: string;
    fechaprestamo: string;
    terminoprestamo: string;
    rutbibliotecario: string;
    urlportada: string;
    usuario_rut: string;
}


function Buscar(){
    const [prestamos, setPrestamos] = useState<Prestamos[]>([]);

    async function getPrestamos(){
        try{
            const resLoan = await tauri.invoke<Prestamos[]>('getallloan');
            console.log("Res all Loan", resLoan);
            setPrestamos(resLoan);
        }catch(error){
            console.error("Error al obtener préstamos:", error);
        }
    }

    
    async function handlequeryloan(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const dataquery = new FormData(event.currentTarget);
        const rut = dataquery.get('rut') as string;

        try{
            const resLoan = await tauri.invoke<Prestamos[]>('getloan', { rut: rut });
            console.log("Res Loan", resLoan);
            setPrestamos(resLoan);
        }catch(error){
            console.error("Error al obtener préstamo:", error);
        }
    }

    useEffect(() => {
        getPrestamos();
    }, []);

    return(
        <Box>
            <div className="inner">
                <form className="querybox" onSubmit={handlequeryloan}>
                    <input type="text" name="rut" placeholder="Ingresar Rut de Usuario" className="queryRut"/>
                    <button type="submit" className="btnBuscar">Buscar</button>
                </form>
                <div className="prestamos">
                    <ul className="prestamos-list">
                        {prestamos.map((prestamo, index) => (
                            <Prestamo
                            key={index}
                            rut={prestamo.usuario_rut}
                            titulo={prestamo.nombrelibro}
                            fechaTermino={prestamo.terminoprestamo}
                            imageUrl={prestamo.urlportada}
                            />
                        ))}         
                    </ul>
                </div>
            </div>
        </Box>
    );
}


export default Buscar;
