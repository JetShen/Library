import '../style/modal.css';
import { tauri } from '@tauri-apps/api';


function Modal({ isOpen, onClose }:{isOpen:boolean, onClose:()=>void}) {
  if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const isbn = data.get('ISBN');
        const url_portada = data.get('url_Portada');
        const titulo = data.get('Titulo');
        const autor = data.get('Autor');
        const categoria = data.get('Categoria');
        const numero_copias = data.get('NumeroCopias');
        const parsed = parseInt(numero_copias as string);

        const ubicacion = data.get('Ubicacion');
        const libro = {
            isbn,
            url_portada,
            titulo,
            autor,
            categoria,
            numero_copias: parsed,
            ubicacion,
        };
        console.log(libro);
        await tauri.invoke('addbook', {isbn: isbn, urlportada: url_portada, titulo: titulo, autor: autor, categoria: categoria, numerocopias: parsed, ubicacion: ubicacion}).then((res) => {
            console.log(res);
        });
    }


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <form className='formadd' onSubmit={handleSubmit}>
            <input type="text" name="ISBN" id="" placeholder="ISBN"/>
            <input type="text" name="url_Portada" id="" placeholder="URL Portada"/>
            <input type="text" name="Titulo" id="" placeholder="Titulo"/>
            <input type="text" name="Autor" id="" placeholder="Autor"/>
            <input type="text" name="Categoria" id="" placeholder="Categoria"/>
            <input type="number" name="NumeroCopias" id="" placeholder="Numero de Copias"/>
            <input type="text" name="Ubicacion" id="" placeholder="Ubicacion"/>
            <button type="submit" className="Generar">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
