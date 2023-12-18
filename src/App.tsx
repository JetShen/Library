import Navbar from './components/navbar';
import Buscar  from './components/buscar';
import Generar from './components/generar';
import Buscarlibro from './components/buscarlibro';
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect, useState } from 'react';


import { HashRouter as Router, Route,  Routes } from 'react-router-dom';


function App() {
  const [BoolDB, setBoolDB] = useState<Boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await invoke<Boolean>('bookdir');
        setBoolDB(result); 
      } catch (error) {
        console.error('Error searching book:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/generar" Component={Generar} />
          <Route path="/buscarLibro" element={<Buscarlibro BoolDB={BoolDB} />} />
          <Route path="/Buscar" Component={Buscar} />
          <Route path="/" element={<Buscarlibro BoolDB={BoolDB} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
