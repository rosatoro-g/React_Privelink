import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const esActivo = (ruta) => location.pathname === ruta;

  return (
    <nav className="navbar-privelink">
      <div className="container navbar-contenido">
        <div className="navbar-links">
          <Link
            to="/feed"
            className={`navbar-link ${
              esActivo("/feed") ? "navbar-link-activo" : ""
            }`}
          >
            Explorar
          </Link>

          <Link
            to="/perfil/1"
            className={`navbar-link ${
              location.pathname.startsWith("/perfil/")
                ? "navbar-link-activo"
                : ""
            }`}
          >
            Mi perfil
          </Link>
        </div>

        <Link to="/" className="navbar-cerrar">
          Cerrar sesión
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;