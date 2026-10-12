import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <div className="home-contenido">
          <p className="home-etiqueta">PrivéLink</p>

          <h2>Encuentra conexiones para cada ocasión</h2>

          <p className="home-descripcion">
            PrivéLink conecta personas que buscan compartir experiencias
            con colaboradores disponibles según sus intereses, ubicación y
            preferencias.
          </p>

          <div className="home-acciones">
            <Link to="/feed" className="boton-principal">
              Explorar perfiles
            </Link>

            <Link to="/login" className="boton-secundario">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;