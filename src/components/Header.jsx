
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  // Mostrar el botón solamente en Login
  const esLogin = location.pathname === "/login";

  return (
    <header className="header-principal">
      <div className="header-contenido">

        <div className="header-izquierda">
          <h1 className="header-logo">PrivéLink</h1>

          {esLogin && (
            <Link to="/" className="header-volver">
              <span aria-hidden="true">←</span>
              Volver al inicio
            </Link>
          )}
        </div>

        <p className="header-frase">
          Conecta, comparte y vive nuevas experiencias.
        </p>

      </div>
    </header>
  );
}

export default Header;
