extern crate rusqlite;

use rusqlite::{Connection, Result};

use crate::currentpath;

pub fn create() -> Result<(), rusqlite::Error> {
    let mut db_path = currentpath();
    db_path.push_str("/DataBase/main.db");
    let conn = Connection::open(db_path)?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Usuario (
            Rut TEXT PRIMARY KEY,
            Nombre TEXT NOT NULL,
            Apellido TEXT NOT NULL,
            Correo TEXT NOT NULL,
            Telefono TEXT NOT NULL,
            Direccion TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Libros (
            ISBN TEXT PRIMARY KEY,
            url_Portada TEXT NOT NULL,
            Titulo TEXT NOT NULL,
            Autor TEXT NOT NULL,
            Categoria TEXT NOT NULL,
            NumeroCopias INTEGER NOT NULL,
            Ubicacion TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Prestamo (
            idPrestamo INTEGER PRIMARY KEY,
            Usuario_Rut TEXT NOT NULL,
            NombreLibro TEXT NOT NULL,
            ISBN TEXT NOT NULL,
            FechaPrestamo TEXT NOT NULL,
            TerminoPrestamo TEXT NOT NULL,
            RutBibliotecario TEXT NOT NULL,
            FOREIGN KEY (Usuario_Rut) REFERENCES Usuario (Rut),
            FOREIGN KEY (ISBN) REFERENCES Libros (ISBN)
        )",
        [],
    )?;

    Ok(())
}
