import '../style/navbar.css'; 
import {  Link } from 'react-router-dom';



function Navbar(){


    return (
    <>
        <header className='logo'>
            <span>Library App</span>
        </header>
        <nav className='navbar-box'>
            <ul className='inner-box'>
                <li><Link to="/generar">Generar Prestamo</Link></li>
                <li><Link to="/buscarLibro">Buscar Libro</Link></li>
                <li><Link to="/Buscar">Buscar Prestamo</Link></li>
            </ul>
        </nav>
    </>
    );
}

export default Navbar;