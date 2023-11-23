import Box from "./box";
import '../style/buscarPrestamo.css'

// rut, titulo, isbn, fechaTermino

function Buscar(){

    const prestamos = [
        {
            titulo: "Libro 1",
            isbn: "123456789",
            rut: "12345678-9",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 2",
            isbn: "987654321",
            rut: "98765432-1",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 3",
            isbn: "123456789",
            rut: "12345678-9",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 4",
            isbn: "987654321",
            rut: "98765432-1",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 5",
            isbn: "123456789",
            rut: "12345678-9",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 6",
            isbn: "987654321",
            rut: "98765432-1",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 7",
            isbn: "123456789",
            rut: "12345678-9",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 8",
            isbn: "987654321",
            rut: "98765432-1",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 9",
            isbn: "123456789",
            rut: "12345678-9",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 10",
            isbn: "987654321",
            rut: "98765432-1",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 11",
            isbn: "123456789",
            rut: "12345678-9",
            fechaTermino: "12/12/2021"
        },
        {
            titulo: "Libro 12",
            isbn: "987654321",
            rut: "98765432-1",
            fechaTermino: "12/12/2021"
        }
    ]

    return(
        <Box>
            <div className="inner">
                <div className="querybox">
                    <input type="text" placeholder="Ingresar Rut de Usuario" className="queryRut" />
                    <button className="btnBuscar">Buscar</button>
                </div>
                <div className="prestamos">
                    
                </div>
            </div>
        </Box>
    );
}


export default Buscar;
