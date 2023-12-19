use super::create::conn;
use rusqlite::{Result, params};

#[tauri::command]
pub fn addbook(isbn: String, urlportada: String, titulo: String, sinopsis:String, autor: String, categoria: Vec<String>, numerocopias: i32, ubicacion: String)  -> Result<(), String>{
    let conn = conn();
    conn.execute(
        "INSERT INTO Libros (ISBN, url_Portada, Titulo, Autor, Sinopsis, NumeroCopias, Ubicacion)
        VALUES (?, ?, ?, ?, ?, ?, ?)",
        params![isbn, urlportada, titulo, autor, sinopsis, numerocopias, ubicacion],
    ).unwrap();

    for categoria in categoria.iter() {
        if let Err(_) = conn.execute(
            "INSERT OR IGNORE INTO Categoria (Nombre) VALUES (?)",
            [categoria],
        ) {
            return Err(format!("Error al insertar categoría {}", categoria));
        }
    }

    let categoria_ids: Result<Vec<i32>> = categoria
        .iter()
        .map(|categoria| {
            conn.query_row(
                "SELECT ID FROM Categoria WHERE Nombre = ?",
                [categoria],
                |row| row.get(0),
            )
        })
        .collect();
    
    for categoria_id in categoria_ids.unwrap().iter() {
        if let Err(_) = conn.execute(
            "INSERT INTO LibroCategoria (Libro_ISBN, Categoria_ID) VALUES (?, ?)",
            params![isbn, categoria_id],
        ) {
            return Err(format!("Error al insertar relación libro-categoría {} {}", isbn, categoria_id));
        }
    }

    Ok(())

}

#[tauri::command]
pub fn adduser(rut: String, nombre: String, apellido: String, correo: String, telefono: String, direccion: String) -> Result<(), String>{
    let conn = conn();
    conn.execute(
        "INSERT INTO Usuario (Rut, Nombre, Apellido, Correo, Telefono, Direccion) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        [rut, nombre, apellido, correo, telefono, direccion],
    ).unwrap();
    Ok(())
}

#[tauri::command]
pub fn addloan( rutusuario: String, nombrelibro: String, isbn: String, fechaprestamo: String, terminoprestamo: String, rutbibliotecario: String) -> Result<(), String>{
    let conn = conn();
    conn.execute(
        "INSERT INTO Prestamo (Usuario_Rut, NombreLibro, ISBN, FechaPrestamo, TerminoPrestamo, RutBibliotecario) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        [rutusuario, nombrelibro, isbn, fechaprestamo, terminoprestamo, rutbibliotecario],
    ).unwrap();
    Ok(())
}