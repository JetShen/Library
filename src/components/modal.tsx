import '../style/modal.css';
import { tauri } from '@tauri-apps/api';
import { writeBinaryFile } from '@tauri-apps/api/fs';
import { Dir } from '@tauri-apps/api/fs';
import { currenPath } from '../script/gobal';


function Modal({ isOpen, onClose }:{isOpen:boolean, onClose:()=>void}) {
  if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const isbn = data.get('ISBN');
        const url_portada =  e.currentTarget.querySelector('[name="url_Portada"]') as HTMLInputElement;

        if (url_portada.files && url_portada.files[0]) {
            const urlPortadaFile = url_portada.files[0];
            const reader = new FileReader();

            reader.onload = async (event) => {
                const base64Url = event.target?.result as string;

                if (base64Url) {
                    const binaryData = atob(base64Url.split(',')[1]);
                    const byteArray = new Uint8Array(binaryData.length);
                    for (let i = 0; i < binaryData.length; i++) {
                        byteArray[i] = binaryData.charCodeAt(i);
                    }
                    const targetDirectory = await currenPath + '/books';
                    const targetFilePath = `${targetDirectory}/${isbn}_portada.png`;
                    
                    await writeBinaryFile(targetFilePath, byteArray, { dir: Dir.App });
                }
            };
            reader.readAsDataURL(urlPortadaFile);
        }
        const titulo = data.get('Titulo');
        const autor = data.get('Autor');
        const categoria = data.get('Categoria');
        const numero_copias = data.get('NumeroCopias');
        const parsed = parseInt(numero_copias as string);
        const portada = `${isbn}_portada.png`
        const ubicacion = data.get('Ubicacion');
        const libro = {
            isbn,
            url_portada: portada,
            titulo,
            autor,
            categoria,
            numero_copias: parsed,
            ubicacion,
        };
        console.log(libro);
        try{
            await tauri.invoke('addbook', {isbn: isbn, urlportada: portada, titulo: titulo, autor: autor, categoria: categoria, numerocopias: parsed, ubicacion: ubicacion}).then((res) => {
              console.log(res);
          });
        }catch(error){
          console.error("Error al agregar libro:", error);
        }
    }


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <form className='formadd' onSubmit={handleSubmit}>
            <input type="text" name="ISBN" id="" placeholder="ISBN"/>
            <input type="file" name="url_Portada" id="" placeholder="URL Portada"/>
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
