import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-contenido">
        <Link to="/feed">
          Explorar
        </Link>

        <Link to="/perfil/1">
          Mi perfil
        </Link>

        <Link to="/">
          Cerrar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;