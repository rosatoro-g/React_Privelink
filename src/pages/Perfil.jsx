import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import TarjetaServicio from "../components/TarjetaServicio";

import perfiles from "../data/Perfiles";

import {
  obtenerServiciosPorPerfil,
  eliminarServicio,
} from "../data/Servicios";

import "../styles/Perfil.css";
import "../styles/Servicio.css";

function Perfil() {
  const { id } = useParams();

  const perfilId = Number(id);

  const perfil = perfiles.find(
    (perfilActual) => perfilActual.id === perfilId
  );

  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    if (perfil) {
      const serviciosPerfil = obtenerServiciosPorPerfil(perfil.id);
      setServicios(serviciosPerfil);
    }
  }, [perfil]);

  const manejarEliminar = (servicioId) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este servicio?"
    );

    if (!confirmar) {
      return;
    }

    eliminarServicio(servicioId);

    const serviciosActualizados = obtenerServiciosPorPerfil(
      perfil.id
    );

    setServicios(serviciosActualizados);
  };

  if (!perfil) {
    return (
      <>
        <Navbar />

        <main className="perfil-page">
          <div className="perfil-container">
            <section className="perfil-no-encontrado">
              <span>✦</span>

              <h1>Perfil no encontrado</h1>

              <p>
                El perfil que intentas visitar no existe o ya no está
                disponible.
              </p>

              <Link
                to="/feed"
                className="boton-volver-feed"
              >
                Volver a explorar
              </Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="perfil-page">
        <div className="perfil-container">
          <div className="perfil-layout">

            {/* =========================
                PERFIL
            ========================== */}

            <aside className="perfil-sidebar">
              <section className="perfil-card">

                <div className="perfil-portada">
                  <div className="perfil-imagen-wrap">
                    <img
                      src={perfil.imagen}
                      alt={`Foto de ${perfil.nombre}`}
                      className="perfil-imagen"
                    />
                  </div>

                  <div className="perfil-portada-degradado"></div>

                  <div className="perfil-portada-etiqueta">
                    PRIVÉLINK
                  </div>
                </div>

                <div className="perfil-card-info">

                  <div className="perfil-identidad">
                    <p className="perfil-seccion-label">
                      PERFIL DESTACADO
                    </p>

                    <div className="perfil-titulo-fila">
                      <h1 className="perfil-nombre">
                        {perfil.nombre}, {perfil.edad}
                      </h1>

                      {perfil.verificado && (
                        <span className="perfil-badge">
                          ✓ Verificado
                        </span>
                      )}
                    </div>

                    <p className="perfil-ubicacion">
                      <span>📍</span>
                      {perfil.ubicacion}
                    </p>
                  </div>

                  <div className="perfil-separador"></div>

                  <div className="perfil-sobre-mi">
                    <span className="perfil-mini-label">
                      SOBRE MÍ
                    </span>

                    <p className="perfil-descripcion">
                      {perfil.descripcion}
                    </p>
                  </div>

                  <div className="perfil-disponibilidad">
                    <span className="perfil-disponibilidad-punto"></span>
                    {perfil.disponibilidad}
                  </div>

                  <div className="perfil-experiencias">
                    <span className="perfil-mini-label">
                      EXPERIENCIAS
                    </span>

                    <div className="perfil-tags">
                      {perfil.servicios.map((servicio) => (
                        <span
                          key={servicio}
                          className="perfil-tag"
                        >
                          {servicio}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="perfil-resumen">

                    <div className="perfil-resumen-item">
                      <span className="perfil-resumen-label">
                        Desde
                      </span>

                      <strong>
                        $
                        {perfil.precio.toLocaleString(
                          "es-CL"
                        )}
                      </strong>
                    </div>

                    <div className="perfil-resumen-item">
                      <span className="perfil-resumen-label">
                        Servicios
                      </span>

                      <strong>
                        {servicios.length}
                      </strong>
                    </div>

                    <div className="perfil-resumen-item">
                      <span className="perfil-resumen-label">
                        Estado
                      </span>

                      <strong className="perfil-resumen-estado">
                        Activo
                      </strong>
                    </div>

                  </div>

                </div>
              </section>
            </aside>

            {/* =========================
                SERVICIOS
            ========================== */}

            <section className="perfil-main">

              <div className="perfil-servicios-superior">

                <div>
                  <p className="perfil-seccion-label">
                    EXPERIENCIAS
                  </p>

                  <h2 className="perfil-servicios-titulo">
                    Mis servicios
                  </h2>

                  <p className="perfil-servicios-descripcion">
                    Descubre las experiencias disponibles, sus
                    características, valores y ubicaciones.
                  </p>
                </div>

                <Link
                  to={`/agregar-servicio?perfil=${perfil.id}`}
                  className="boton-agregar-servicio"
                >
                  <span>+</span>
                  Agregar servicio
                </Link>

              </div>

              {servicios.length > 0 ? (
                <div className="perfil-servicios-grid">

                  {servicios.map((servicio) => (
                    <TarjetaServicio
                      key={servicio.id}
                      servicio={servicio}
                      onEliminar={manejarEliminar}
                    />
                  ))}

                </div>
              ) : (
                <div className="perfil-sin-servicios">

                  <span>✦</span>

                  <h3>
                    Aún no hay servicios publicados
                  </h3>

                  <p>
                    Puedes agregar una nueva experiencia para
                    mostrarla dentro de este perfil.
                  </p>

                  <Link
                    to={`/agregar-servicio?perfil=${perfil.id}`}
                    className="boton-agregar-servicio"
                  >
                    + Agregar primer servicio
                  </Link>

                </div>
              )}

            </section>

          </div>
        </div>
      </main>
    </>
  );
}

export default Perfil;