import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import perfiles from "../data/Perfiles";
import servicios from "../data/Servicios";

import "../styles/Perfil.css";

function Perfil() {
  const { id } = useParams();

  const perfil = perfiles.find(
    (perfil) => perfil.id === Number(id)
  );

  if (!perfil) {
    return (
      <>
        <Navbar />

        <main className="perfil-no-encontrado">
          <h2>Perfil no encontrado</h2>

          <Link to="/feed" className="boton-volver">
            Volver al feed
          </Link>
        </main>
      </>
    );
  }

  const serviciosPerfil = servicios.filter(
    (servicio) => servicio.perfilId === perfil.id
  );

  return (
    <>
      <Navbar />

      <main className="perfil">
        <section className="perfil-cabecera">
          <img
            src={perfil.imagen}
            alt={`Foto de ${perfil.nombre}`}
            className="perfil-foto"
          />

          <div className="perfil-informacion">
            <div className="perfil-titulo">
              <h1>
                {perfil.nombre}, {perfil.edad}
              </h1>

              {perfil.verificado && (
                <span className="perfil-verificado">
                  ✓ Perfil verificado
                </span>
              )}
            </div>

            <p className="perfil-ubicacion">
              📍 {perfil.ubicacion}
            </p>

            <p className="perfil-descripcion">
              {perfil.descripcion}
            </p>

            <p className="perfil-disponibilidad">
              {perfil.disponibilidad}
            </p>

            <div className="perfil-servicios-resumen">
              {perfil.servicios.map((servicio) => (
                <span key={servicio}>
                  {servicio}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="perfil-servicios">
          <div className="perfil-servicios-encabezado">
            <div>
              <p className="seccion-etiqueta">
                EXPERIENCIAS
              </p>

              <h2>Mis servicios</h2>
            </div>

            <Link
              to={`/agregar-servicio?perfil=${perfil.id}`}
              className="boton-agregar-servicio"
            >
              + Agregar servicio
            </Link>
          </div>

          {serviciosPerfil.length > 0 ? (
            <div className="servicios-grid">
              {serviciosPerfil.map((servicio) => (
                <article
                  className="servicio-card"
                  key={servicio.id}
                >
                  <img
                    src={servicio.imagen}
                    alt={servicio.nombre}
                    className="servicio-imagen"
                  />

                  <div className="servicio-contenido">
                    <span className="servicio-categoria">
                      {servicio.categoria}
                    </span>

                    <h3>{servicio.nombre}</h3>

                    <p>{servicio.descripcion}</p>

                    <div className="servicio-footer">
                      <strong>
                        $
                        {servicio.precio.toLocaleString(
                          "es-CL"
                        )}
                      </strong>

                      <span>{servicio.ubicacion}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="sin-servicios">
              Este perfil todavía no tiene servicios publicados.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default Perfil;