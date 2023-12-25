use lettre::message::header::ContentType;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};


#[tauri::command]
pub fn send_email(nombre:String, correo:String, titulo:String, _rut:String, fechaprestamo:String, fechavencimiento:String) -> Result<(), String>{
    let cuerpo = format!("
    Estimado {nombre}, 
    Esperamos que este mensaje lo encuentre bien. Le escribimos desde la Biblioteca para recordarle que el libro titulado {titulo} que usted solicito el {fechaprestamo} está próximo a expirar.
    La fecha de vencimiento para la devolución de este libro es el {fechavencimiento}, por lo que le solicitamos amablemente que lo devuelva antes de esa fecha para evitar posibles cargos por retraso.");
    
    let email = Message::builder()
        .from("".parse().unwrap())
        .to(correo.parse().unwrap())
        .subject("Recordatorio Importante: Próxima Expiración de Préstamo")
        .header(ContentType::TEXT_PLAIN)
        .body(String::from(&cuerpo))
        .unwrap();

    let creds = Credentials::new("".to_owned(), "".to_owned());

    // Open a remote connection to gmail
    let mailer = SmtpTransport::relay("smtp.gmail.com")
        .unwrap()
        .credentials(creds)
        .build();

    // Send the email
    match mailer.send(&email) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}