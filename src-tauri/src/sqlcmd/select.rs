use super::create::conn;

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