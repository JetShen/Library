import Navbar from './components/navbar';
import Buscar  from './components/buscar';
import Generar from './components/generar';
import Buscarlibro from './components/buscarlibro';

import { HashRouter as Router, Route,  Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/generar" Component={Generar} />
          <Route path="/buscarLibro" Component={Buscarlibro} />
          <Route path="/Buscar" Component={Buscar} />
          <Route path="/" Component={Generar} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
