use super::create::conn;


#[tauri::command]
pub fn removeloan(idprestamo: i32) -> Result<(), String>{
    let conn = conn();
    println!("idPrestamo: {}", idprestamo);
    conn.execute(
        "DELETE FROM Prestamo WHERE idPrestamo = ?1",
        [idprestamo],
    ).unwrap();
    Ok(())
}
