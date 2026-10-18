import { Link } from "react-router-dom";
import logoPrivelink from "../assets/img/Privelink_logo.png";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home">
      <section className="home-hero">
        <div className="home-contenido">
          <img
            src={logoPrivelink}
            alt="Logo PrivéLink"
            className="home-logo"
          />

          <p className="home-etiqueta">
            CONECTA · COMPARTE · VIVE NUEVAS EXPERIENCIAS
          </p>

          <h2>Encuentra conexiones para cada ocasión</h2>

          <p className="home-descripcion">
            PrivéLink conecta clientes con colaboradores disponibles para
            compartir distintas experiencias según intereses, ubicación,
            disponibilidad y preferencias.
          </p>

          <div className="home-acciones">
            <Link to="/login" className="home-boton-principal">
              Iniciar sesión
            </Link>

            <Link to="/registro-usuario" className="home-boton-secundario">
              Registrarse
            </Link>
          </div>
        </div>
      </section>

      <section className="home-informacion">
        <div className="home-informacion-contenido">
          <p className="home-mini-titulo">DESCUBRE PRIVÉLINK</p>

          <h2>Una plataforma pensada para conectar</h2>

          <p className="home-texto-informacion">
            Explora perfiles, conoce los servicios disponibles y encuentra
            alternativas para compartir eventos, cenas, actividades y otras
            experiencias.
          </p>

          <div className="home-caracteristicas">
            <article>
              <span>01</span>
              <h3>Explora</h3>
              <p>
                Busca perfiles según ubicación, presupuesto, servicio y
                disponibilidad.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Conecta</h3>
              <p>
                Conoce colaboradores y revisa las experiencias que ofrecen
                dentro de la plataforma.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Elige</h3>
              <p>
                Encuentra una alternativa acorde a tus intereses y al tipo de
                experiencia que buscas.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;