import { tauri } from '@tauri-apps/api';

function ModalUser({ isOpenU, onCloseU }:{isOpenU:boolean, onCloseU:()=>void}){
  if (!isOpenU) return null;

    const handleAddU = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const rut = data.get('rut');
    const nombre = data.get('nombre');
    const apellido = data.get('apellido');
    const email = data.get('email');
    const telefono = data.get('telefono');
    const direccion = data.get('direccion');

    const usuario = {
        rut,
        nombre,
        apellido,
        email,
        telefono,
        direccion,
    };
    console.log(usuario);
    await tauri.invoke('adduser', {rut: rut, nombre: nombre, apellido: apellido, correo: email, telefono: telefono, direccion: direccion}).then((res) => {
        console.log(res);
    });
  }

  return(
    <div className="modal-overlay">
        <div className="modal-content">
            <span className="close-button" onClick={onCloseU}>
                &times;
            </span>
            <form className="formadd" onSubmit={handleAddU}>
                <input type="text" name="rut" id="" placeholder="Rut"/>
                <input type="text" name="nombre" id="" placeholder="Nombre"/>
                <input type="text" name="apellido" id="" placeholder="Apellido"/>
                <input type="text" name="email" id="" placeholder="Email"/>
                <input type="text" name="telefono" id="" placeholder="Telefono"/>
                <input type="text" name="direccion" id="" placeholder="Direccion"/>
                <button type="submit" className="Generar">Agregar</button>
            </form>
        </div>
    </div>
  )

}


export default ModalUser;