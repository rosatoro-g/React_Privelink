import { useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import TarjetaServicio from "../components/TarjetaServicio";

import perfiles from "../data/Perfiles";

import {
  obtenerServiciosPorPerfil,
  eliminarServicio,
} from "../data/Servicios";

import "../styles/Perfil.css";

function Perfil() {
  const { id } = useParams();

  const perfilId = Number(id);

  const perfil = perfiles.find(
    (perfilActual) => perfilActual.id === perfilId
  );

  const [serviciosPerfil, setServiciosPerfil] =
    useState(() =>
      obtenerServiciosPorPerfil(perfilId)
    );

  /*
   * SIMULACIÓN DE AUTORIZACIÓN
   *
   * rol_usuario:
   * - cliente
   * - colaborador
   * - admin
   *
   * perfil_usuario_id:
   * ID del perfil perteneciente a la colaboradora
   * que inició sesión.
   */

  const rolUsuario =
    localStorage.getItem("rol_usuario") || "cliente";

  const perfilUsuarioId = Number(
    localStorage.getItem("perfil_usuario_id")
  );

  const esPropietaria =
    rolUsuario === "colaborador" &&
    perfilUsuarioId === perfilId;

  function manejarEliminar(servicioId) {
    if (!esPropietaria) {
      return;
    }

    const confirmar = window.confirm(
      "¿Deseas eliminar este servicio?"
    );

    if (!confirmar) {
      return;
    }

    eliminarServicio(servicioId);

    setServiciosPerfil(
      obtenerServiciosPorPerfil(perfilId)
    );
  }

  if (!perfil) {
    return (
      <>
        <Navbar />

        <main className="perfil-page">
          <div className="perfil-container">
            <section className="servicio-no-encontrado">
              <h2>Perfil no encontrado</h2>

              <p>
                El perfil que buscas no se encuentra disponible.
              </p>

              <Link to="/feed">
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

            {/* =================================================
                INFORMACIÓN DEL PERFIL
                ================================================= */}

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
                      {esPropietaria
                        ? "MI PERFIL"
                        : "PERFIL DESTACADO"}
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
                        {serviciosPerfil.length}
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

            {/* =================================================
                SERVICIOS
                ================================================= */}

            <section className="perfil-main">

              <div className="perfil-servicios-superior">
                <div>
                  <p className="perfil-seccion-label">
                    EXPERIENCIAS
                  </p>

                  <h2 className="perfil-servicios-titulo">
                    {esPropietaria
                      ? "Mis servicios"
                      : "Servicios disponibles"}
                  </h2>

                  <p className="perfil-servicios-descripcion">
                    {esPropietaria
                      ? "Administra las experiencias que tienes publicadas en tu perfil."
                      : "Descubre las experiencias disponibles, sus características, valores y ubicaciones."}
                  </p>
                </div>

                {esPropietaria && (
                  <Link
                    to={`/agregar-servicio?perfil=${perfil.id}`}
                    className="boton-agregar-servicio"
                  >
                    <span>+</span>
                    Agregar servicio
                  </Link>
                )}
              </div>

              {serviciosPerfil.length > 0 ? (
                <div className="perfil-servicios-grid">
                  {serviciosPerfil.map((servicio) => (
                    <TarjetaServicio
                      key={servicio.id}
                      servicio={servicio}
                      puedeEditar={esPropietaria}
                      onEliminar={
                        esPropietaria
                          ? manejarEliminar
                          : undefined
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="sin-servicios">
                  <p>
                    {esPropietaria
                      ? "Todavía no tienes servicios publicados."
                      : "Este perfil todavía no tiene servicios disponibles."}
                  </p>
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