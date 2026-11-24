import {
  useEffect,
  useState,
} from "react";

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

// =========================================================
// OBTENER PERFILES LOCALES
// =========================================================

function obtenerPerfilesLocales() {
  try {
    return JSON.parse(
      localStorage.getItem(
        "privelink_perfiles_colaborador"
      ) || "[]"
    );
  } catch {
    return [];
  }
}

// =========================================================
// COMPONENTE
// =========================================================

function Perfil() {
  const { id } = useParams();

  const perfilId = Number(id);

  // =====================================================
  // PERFIL
  // =====================================================

  const perfilesLocales =
    obtenerPerfilesLocales();

  const perfilLocal =
    perfilesLocales.find(
      (perfilActual) =>
        Number(perfilActual.id) ===
        perfilId
    );

  const perfilDemo =
    perfiles.find(
      (perfilActual) =>
        Number(perfilActual.id) ===
        perfilId
    );

  const perfil =
    perfilLocal || perfilDemo;

  // =====================================================
  // ESTADOS
  // =====================================================

  const [
    serviciosPerfil,
    setServiciosPerfil,
  ] = useState([]);

  const [
    cargando,
    setCargando,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // =====================================================
  // SESIÓN
  // =====================================================

  const rolUsuario =
    localStorage.getItem(
      "rol_usuario"
    ) || "cliente";

  const perfilUsuarioId =
    Number(
      localStorage.getItem(
        "perfil_usuario_id"
      )
    );

  const esPropietaria =
    rolUsuario === "colaborador" &&
    perfilUsuarioId === perfilId;

  // =====================================================
  // CARGAR SERVICIOS
  // =====================================================

  useEffect(() => {
    let activo = true;

    async function cargarServicios() {
      try {
        setCargando(true);
        setError("");

        const servicios =
          await obtenerServiciosPorPerfil(
            perfilId
          );

        if (!activo) {
          return;
        }

        setServiciosPerfil(
          Array.isArray(servicios)
            ? servicios
            : []
        );
      } catch (errorCarga) {
        console.error(
          "Error al cargar servicios:",
          errorCarga
        );

        if (!activo) {
          return;
        }

        setError(
          errorCarga.message ||
            "No fue posible cargar los servicios."
        );

        setServiciosPerfil([]);
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarServicios();

    return () => {
      activo = false;
    };
  }, [perfilId]);

  // =====================================================
  // ELIMINAR SERVICIO
  // =====================================================

  async function manejarEliminar(
    servicioId
  ) {
    if (!esPropietaria) {
      return;
    }

    const confirmar =
      window.confirm(
        "¿Deseas eliminar este servicio?"
      );

    if (!confirmar) {
      return;
    }

    try {
      setError("");

      await eliminarServicio(
        servicioId
      );

      setServiciosPerfil(
        (serviciosActuales) =>
          serviciosActuales.filter(
            (servicio) =>
              servicio.id !==
              servicioId
          )
      );
    } catch (errorEliminar) {
      console.error(
        "Error al eliminar servicio:",
        errorEliminar
      );

      setError(
        errorEliminar.message ||
          "No fue posible eliminar el servicio."
      );
    }
  }

  // =====================================================
  // PERFIL NO ENCONTRADO
  // =====================================================

  if (!perfil) {
    return (
      <>
        <Navbar />

        <main className="perfil-page">
          <div className="perfil-container">

            <section className="servicio-no-encontrado">

              <h2>
                Perfil no encontrado
              </h2>

              <p>
                El perfil que buscas no se
                encuentra disponible.
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

  // =====================================================
  // DATOS VISUALES
  // =====================================================

  const precioPerfil =
    Number(
      perfil.precio || 0
    );

  const experiencias =
    Array.isArray(
      perfil.servicios
    )
      ? perfil.servicios
      : [];

  // =====================================================
  // INTERFAZ
  // =====================================================

  return (
    <>
      <Navbar />

      <main className="perfil-page">

        <div className="perfil-container">

          <div className="perfil-layout">

            {/* ===========================================
                PERFIL
                =========================================== */}

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
                        {perfil.nombre}

                        {perfil.edad
                          ? `, ${perfil.edad}`
                          : ""}
                      </h1>

                      {perfil.verificado && (
                        <span className="perfil-badge">
                          ✓ Verificado
                        </span>
                      )}

                    </div>

                    <p className="perfil-ubicacion">

                      <span>
                        📍
                      </span>

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

                    {perfil.disponibilidad ||
                      "Disponible hoy"}

                  </div>

                  {experiencias.length > 0 && (
                    <div className="perfil-experiencias">

                      <span className="perfil-mini-label">
                        EXPERIENCIAS
                      </span>

                      <div className="perfil-tags">

                        {experiencias.map(
                          (experiencia) => (
                            <span
                              key={
                                experiencia
                              }
                              className="perfil-tag"
                            >
                              {
                                experiencia
                              }
                            </span>
                          )
                        )}

                      </div>

                    </div>
                  )}

                  <div className="perfil-resumen">

                    <div className="perfil-resumen-item">

                      <span className="perfil-resumen-label">
                        Desde
                      </span>

                      <strong>
                        $
                        {precioPerfil.toLocaleString(
                          "es-CL"
                        )}
                      </strong>

                    </div>

                    <div className="perfil-resumen-item">

                      <span className="perfil-resumen-label">
                        Servicios
                      </span>

                      <strong>
                        {
                          serviciosPerfil.length
                        }
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

            {/* ===========================================
                SERVICIOS
                =========================================== */}

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
                    <span>
                      +
                    </span>

                    Agregar servicio
                  </Link>
                )}

              </div>

              {/* ERROR */}

              {error && (
                <div className="sin-servicios">
                  <p>
                    {error}
                  </p>
                </div>
              )}

              {/* CARGANDO */}

              {!error && cargando && (
                <div className="sin-servicios">
                  <p>
                    Cargando servicios...
                  </p>
                </div>
              )}

              {/* SERVICIOS */}

              {!error &&
                !cargando &&
                serviciosPerfil.length > 0 && (

                  <div className="perfil-servicios-grid">

                    {serviciosPerfil.map(
                      (servicio) => (

                        <TarjetaServicio
                          key={
                            servicio.id
                          }
                          servicio={
                            servicio
                          }
                          puedeEditar={
                            esPropietaria
                          }
                          onEliminar={
                            esPropietaria
                              ? manejarEliminar
                              : undefined
                          }
                        />

                      )
                    )}

                  </div>

                )}

              {/* SIN SERVICIOS */}

              {!error &&
                !cargando &&
                serviciosPerfil.length === 0 && (

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