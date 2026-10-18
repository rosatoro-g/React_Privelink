import {
  Link,
  useLocation,
} from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const rolUsuario =
    localStorage.getItem("rol_usuario") || "cliente";

  const perfilUsuarioId = Number(
    localStorage.getItem("perfil_usuario_id")
  );

  const esColaborador =
    rolUsuario === "colaborador" &&
    perfilUsuarioId > 0;

  const rutaMiPerfil = esColaborador
    ? `/perfil/${perfilUsuarioId}`
    : null;

  const cerrarSesion = () => {
    localStorage.removeItem("rol_usuario");
    localStorage.removeItem("perfil_usuario_id");
  };

  return (
    <nav className="navbar-privelink">
      <div className="container navbar-contenido">

        <div className="navbar-links">

          <Link
            to="/feed"
            className={`navbar-link ${
              location.pathname === "/feed"
                ? "navbar-link-activo"
                : ""
            }`}
          >
            Explorar
          </Link>

          {esColaborador && (
            <Link
              to={rutaMiPerfil}
              className={`navbar-link ${
                location.pathname === rutaMiPerfil
                  ? "navbar-link-activo"
                  : ""
              }`}
            >
              Mi perfil
            </Link>
          )}

          {rolUsuario === "admin" && (
            <Link
              to="/admin"
              className={`navbar-link ${
                location.pathname === "/admin"
                  ? "navbar-link-activo"
                  : ""
              }`}
            >
              Administración
            </Link>
          )}

        </div>

        <Link
          to="/"
          className="navbar-cerrar"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;