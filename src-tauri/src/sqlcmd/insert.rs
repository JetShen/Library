use super::create::conn;
use rusqlite::{Result, params};

#[tauri::command]
pub fn addbook(isbn: String, urlportada: String, titulo: String, autor: String, categoria: String, numerocopias: i32, ubicacion: String)  -> Result<(), String>{
    let conn = conn();
    conn.execute(
        "INSERT INTO Libros (ISBN, url_Portada, Titulo, Autor, Categoria, NumeroCopias, Ubicacion) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        params![isbn, urlportada, titulo, autor, categoria, numerocopias, ubicacion],
    ).unwrap();
    Ok(())
}

pub fn adduser(rut: String, nombre: String, apellido: String, correo: String, telefono: String, direccion: String) -> Result<(), rusqlite::Error>{
    let conn = conn();
    conn.execute(
        "INSERT INTO Usuario (Rut, Nombre, Apellido, Correo, Telefono, Direccion) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        [rut, nombre, apellido, correo, telefono, direccion],
    ).unwrap();
    Ok(())
}

pub fn addloan( rutusuario: String, nombrelibro: String, isbn: String, fechaprestamo: String, terminoprestamo: String, rutbibliotecario: String) -> Result<(), rusqlite::Error>{
    let conn = conn();
    conn.execute(
        "INSERT INTO Prestamo (Usuario_Rut, NombreLibro, ISBN, FechaPrestamo, TerminoPrestamo, RutBibliotecario) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
        [rutusuario, nombrelibro, isbn, fechaprestamo, terminoprestamo, rutbibliotecario],
    ).unwrap();
    Ok(())
}