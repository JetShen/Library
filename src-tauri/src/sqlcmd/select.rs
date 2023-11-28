use super::create::conn;
use serde::{Serialize, ser::SerializeStruct};

// "CREATE TABLE IF NOT EXISTS Libros (
//     ISBN TEXT PRIMARY KEY,
//     url_Portada TEXT NOT NULL,
//     Titulo TEXT NOT NULL,
//     Autor TEXT NOT NULL,
//     Categoria TEXT NOT NULL,
//     NumeroCopias INTEGER NOT NULL,
//     Ubicacion TEXT NOT NULL
// )",

pub struct Book {
    isbn: String,
    urlportada: String,
    titulo: String,
    autor: String,
    categoria: String,
    numerocopias: i32,
    ubicacion: String
}
impl Serialize for Book {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("Book", 7)?;
        state.serialize_field("isbn", &self.isbn)?;
        state.serialize_field("urlportada", &self.urlportada)?;
        state.serialize_field("titulo", &self.titulo)?;
        state.serialize_field("autor", &self.autor)?;
        state.serialize_field("categoria", &self.categoria)?;
        state.serialize_field("numerocopias", &self.numerocopias)?;
        state.serialize_field("ubicacion", &self.ubicacion)?;
        state.end()
    }
}

#[tauri::command]
pub fn getuser(rut: String) -> bool {
    let conn = conn();
    let mut stmt = conn.prepare("SELECT * FROM Usuario WHERE Rut = ?1").unwrap();
    let result = stmt.query_row([rut], |_| Ok(()));
    println!("{:?}", result);
    match result {
        Ok(_) => true,
        Err(_) => false
    }
}

#[tauri::command]
pub fn getallbooks() -> Vec<Book> {
    let conn = conn();
    let mut stmt = conn.prepare("SELECT * FROM Libros").unwrap();
    let result = stmt.query_map([], |row| {
        Ok(Book {
            isbn: row.get(0)?,
            urlportada: row.get(1)?,
            titulo: row.get(2)?,
            autor: row.get(3)?,
            categoria: row.get(4)?,
            numerocopias: row.get(5)?,
            ubicacion: row.get(6)?,
        })
    })
    .unwrap();
    let mut books: Vec<Book> = Vec::new();
    for book in result {
        books.push(book.unwrap());
    }
    books
}


#[tauri::command]
pub fn getbook(titulo: String) -> Vec<Book> {
    let conn = conn();
    let mut stmt = conn.prepare("SELECT * FROM Libros WHERE Titulo LIKE '%' || ?1 || '%'").unwrap();
    let result = stmt.query_map([titulo], |row| {
        Ok(Book {
            isbn: row.get(0)?,
            urlportada: row.get(1)?,
            titulo: row.get(2)?,
            autor: row.get(3)?,
            categoria: row.get(4)?,
            numerocopias: row.get(5)?,
            ubicacion: row.get(6)?,
        })
    })
    .unwrap();
    let mut books: Vec<Book> = Vec::new();
    for book in result {
        books.push(book.unwrap());
    }
    books
}