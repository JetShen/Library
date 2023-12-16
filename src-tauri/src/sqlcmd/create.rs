extern crate rusqlite;

use rusqlite::{Connection, Result};

use crate::currentpath;

pub fn conn() -> Connection {
    let mut path = currentpath();
    path.push_str("/DataBase");
    path.push_str("/biblioteca.db");
    Connection::open(path).unwrap()
}



pub fn create() -> Result<(), rusqlite::Error> {
    let conn = conn();

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
            NumeroCopias INTEGER NOT NULL,
            Ubicacion TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Categoria (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre TEXT NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS LibroCategoria (
            Libro_ISBN TEXT,
            Categoria_ID INTEGER,
            PRIMARY KEY (Libro_ISBN, Categoria_ID),
            FOREIGN KEY (Libro_ISBN) REFERENCES Libros (ISBN),
            FOREIGN KEY (Categoria_ID) REFERENCES Categoria (ID)
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS Prestamo (
            idPrestamo INTEGER PRIMARY KEY AUTOINCREMENT,
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
