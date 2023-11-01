import Box from "./box";
import "../style/generar.css"

function Generar() {
    return (
        <Box>
            <form className="generarPrestamo">
                <input type="text" name="rut" id="" placeholder="Rut Usuario"/>
                <input type="text" name="nombrelibro" id="" placeholder="Nombre Libro"/>
                <input type="text" name="isbn" id="" placeholder="ISBN"/>
                <input type="date" name="fechaprestamo" id="" placeholder="Fecha Prestamo"/>
                <input type="date" name="terminoprestamo" id="" placeholder="Termino de Prestamo"/>
                <input type="text" name="rutbibliotecario" id="" placeholder="Rut Bibliotecario"/>
                <button type="submit" className="Generar">Generar</button>
            </form>
        </Box>
    );
}

export default Generar;