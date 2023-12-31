import { useState, useEffect } from 'react';
import { tauri } from '@tauri-apps/api';
import '../style/book.css';
import { currenPath } from '../script/gobal';
import { convertFileSrc } from '@tauri-apps/api/tauri';

type BookProps = {
  title: string;
  imageUrl: string;
  onClick?: () => void;
};

function Book({ title , imageUrl }: BookProps) {
  const [backgroundStyle, setBackgroundStyle] = useState<string>('');
  
  const handleExist = async () => {
    try {
      const mainPath = await currenPath;
      const res = await tauri.invoke('verifypath', { path: imageUrl });
      if (res === true) {
        setBackgroundStyle(() => `url(${convertFileSrc(mainPath+'/books/' + imageUrl)})`);
      } else {
        console.warn("Image not found. Showing default image.");
        setBackgroundStyle(() => `url(/books/default.png)`);
      }
    } catch (error) {
      console.error("Error verifying the existence of the image:", error);
    }
  };

  useEffect(() => {
    handleExist();
  }, [imageUrl]);

  return (
    <div className="book" style={{ backgroundImage: backgroundStyle }}>
      <div className="info">
        <p className='title'>{title}</p>
      </div>
    </div>
  );
}

export default Book;
