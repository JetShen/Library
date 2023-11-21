// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env;
use std::path::PathBuf;
use std::fs;

#[tauri::command]
fn currentpath() -> String {
    let new_path = PathBuf::from(env::current_dir().unwrap());
    new_path.to_str().unwrap().to_string()
}

#[tauri::command]
fn bookdir() -> Result<(), String>{
    let mut path = currentpath();
    path.push_str("/books");
    let _ = fs::create_dir_all(path);
    Ok(())
}

#[tauri::command]
fn verifypath(path: String) -> bool {
    let mut current_path = currentpath();
    current_path.push_str(&path);

    if fs::metadata(&current_path).is_ok() {
        true
    } else {
        false
    }
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![currentpath, verifypath, bookdir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

