use super::create::conn;
use serde::{Serialize, ser::SerializeStruct};
use rusqlite::{params, Result};

pub struct Book {
    isbn: String,
    urlportada: String,
    titulo: String,
    autor: String,
    categoria: Vec<String>,
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

pub struct BookCategory {
    isbn: String,
    urlportada: String,
    titulo: String,
    autor: String,
    categoria: Vec<String>,
    numerocopias: i32,
    ubicacion: String,
    coincidencias: i32
}
impl Serialize for BookCategory {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("BookCategory", 8)?;
        state.serialize_field("isbn", &self.isbn)?;
        state.serialize_field("urlportada", &self.urlportada)?;
        state.serialize_field("titulo", &self.titulo)?;
        state.serialize_field("autor", &self.autor)?;
        state.serialize_field("categoria", &self.categoria)?;
        state.serialize_field("numerocopias", &self.numerocopias)?;
        state.serialize_field("ubicacion", &self.ubicacion)?;
        state.serialize_field("coincidencias", &self.coincidencias)?;
        state.end()
    }
}

pub struct Prestamo {
    idprestamo: i32,
    usuario_rut: String,
    nombrelibro: String,
    isbn: String,
    fechaprestamo: String,
    terminoprestamo: String,
    rutbibliotecario: String,
    urlportada: String,
}
impl Serialize for Prestamo {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_struct("Prestamo", 7)?;
        state.serialize_field("idprestamo", &self.idprestamo)?;
        state.serialize_field("usuario_rut", &self.usuario_rut)?;
        state.serialize_field("nombrelibro", &self.nombrelibro)?;
        state.serialize_field("isbn", &self.isbn)?;
        state.serialize_field("fechaprestamo", &self.fechaprestamo)?;
        state.serialize_field("terminoprestamo", &self.terminoprestamo)?;
        state.serialize_field("rutbibliotecario", &self.rutbibliotecario)?;
        state.serialize_field("urlportada", &self.urlportada)?;
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
    let mut stmt = conn.prepare("SELECT Libros.ISBN, Libros.url_Portada, Libros.Titulo, Libros.Autor, Libros.NumeroCopias, Libros.Ubicacion, GROUP_CONCAT(Categoria.Nombre, ', ')
    AS Categorias 
    FROM Libros 
    JOIN LibroCategoria ON Libros.ISBN = LibroCategoria.Libro_ISBN 
    JOIN Categoria ON LibroCategoria.Categoria_ID = Categoria.ID 
    GROUP BY Libros.ISBN").unwrap();

    let result = stmt.query_map([], |row| {
        Ok(Book {
            isbn: row.get(0)?,
            urlportada: row.get(1)?,
            titulo: row.get(2)?,
            autor: row.get(3)?,
            numerocopias: row.get(4)?,
            ubicacion: row.get(5)?,
            categoria: vec![row.get(6)?],
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
    let mut stmt = conn.prepare("SELECT Libros.ISBN, Libros.url_Portada, Libros.Titulo, Libros.Autor, Libros.NumeroCopias, Libros.Ubicacion, GROUP_CONCAT(Categoria.Nombre, ', ')
    AS Categorias 
    FROM Libros 
    JOIN LibroCategoria ON Libros.ISBN = LibroCategoria.Libro_ISBN 
    JOIN Categoria ON LibroCategoria.Categoria_ID = Categoria.ID 
    WHERE Libros.Titulo LIKE '%' || ?1 || '%' 
    GROUP BY Libros.ISBN ").unwrap();

    let result = stmt.query_map([titulo], |row| {
        Ok(Book {
            isbn: row.get(0)?,
            urlportada: row.get(1)?,
            titulo: row.get(2)?,
            autor: row.get(3)?,
            numerocopias: row.get(4)?,
            ubicacion: row.get(5)?,
            categoria: vec![row.get(6)?],
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
pub fn getbookbycategory(categorias: Vec<String>) -> Vec<Book> {
    let conn = conn();

    let query = format!(
        "SELECT Libros.ISBN, Libros.url_Portada, Libros.Titulo, Libros.Autor, Libros.NumeroCopias, Libros.Ubicacion, GROUP_CONCAT(Categoria.Nombre, ', ')
        AS Categorias
        FROM Libros
        JOIN LibroCategoria ON Libros.ISBN = LibroCategoria.Libro_ISBN
        JOIN Categoria ON LibroCategoria.Categoria_ID = Categoria.ID
        WHERE Libros.ISBN IN (
            SELECT Libros.ISBN
            FROM Libros
            JOIN LibroCategoria ON Libros.ISBN = LibroCategoria.Libro_ISBN
            JOIN Categoria ON LibroCategoria.Categoria_ID = Categoria.ID
            WHERE Categoria.Nombre IN ({})
            GROUP BY Libros.ISBN
            HAVING COUNT(DISTINCT Categoria.Nombre) >= {}
        )
        GROUP BY Libros.ISBN, Libros.Titulo",
        categorias.iter().map(|cate| format!("'{}'", cate).to_string()).collect::<Vec<_>>().join(", "),
        categorias.len()
    );

    let mut stmt = conn.prepare(&query).unwrap();

    let result = stmt.query_map([], |row| {
        Ok(Book {
            isbn: row.get(0)?,
            urlportada: row.get(1)?,
            titulo: row.get(2)?,
            autor: row.get(3)?,
            numerocopias: row.get(4)?,
            ubicacion: row.get(5)?,
            categoria: vec![row.get(6)?],
        })
    }).unwrap();

    let mut books: Vec<Book> = Vec::new();
    for book in result {
        books.push(book.unwrap());
    }
    books
}


#[tauri::command]
pub fn getallloan() ->Vec<Prestamo> {
    let conn = conn();
    let mut stmt = conn.prepare(
        "SELECT Prestamo.idPrestamo, Prestamo.Usuario_Rut, Prestamo.NombreLibro, Prestamo.ISBN, Prestamo.FechaPrestamo, Prestamo.TerminoPrestamo, Prestamo.RutBibliotecario, Libros.url_Portada
         FROM Prestamo
         JOIN Libros ON Prestamo.ISBN = Libros.ISBN",
    ).unwrap();
    let result = stmt.query_map([], |row| {
        Ok(Prestamo {
            idprestamo: row.get(0)?,
            usuario_rut: row.get(1)?,
            nombrelibro: row.get(2)?,
            isbn: row.get(3)?,
            fechaprestamo: row.get(4)?,
            terminoprestamo: row.get(5)?,
            rutbibliotecario: row.get(6)?,
            urlportada: row.get(7)?,
        })
    })
    .unwrap();
    let mut prestamos: Vec<Prestamo> = Vec::new();
    for prestamo in result {
        prestamos.push(prestamo.unwrap());
    }
    prestamos
}

#[tauri::command]
pub fn getloan(rut: String) -> Vec<Prestamo> {
    let conn = conn();
    let mut stmt = conn.prepare(
        "SELECT Prestamo.idPrestamo, Prestamo.Usuario_Rut, Prestamo.NombreLibro, Prestamo.ISBN, Prestamo.FechaPrestamo, Prestamo.TerminoPrestamo, Prestamo.RutBibliotecario, Libros.url_Portada
         FROM Prestamo
         JOIN Libros ON Prestamo.ISBN = Libros.ISBN
         WHERE Prestamo.Usuario_Rut = ?1",
    ).unwrap();

    let result = stmt.query_map(params![rut], |row| {
        Ok(Prestamo {
            idprestamo: row.get(0)?,
            usuario_rut: row.get(1)?,
            nombrelibro: row.get(2)?,
            isbn: row.get(3)?,
            fechaprestamo: row.get(4)?,
            terminoprestamo: row.get(5)?,
            rutbibliotecario: row.get(6)?,
            urlportada: row.get(7)?,
        })
    })
    .unwrap();
    let mut prestamos: Vec<Prestamo> = Vec::new();
    for prestamo in result {
        prestamos.push(prestamo.unwrap());
    }
    prestamos
}