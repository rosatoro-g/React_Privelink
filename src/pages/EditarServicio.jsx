import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  obtenerServicioPorId,
  actualizarServicio,
} from "../data/Servicios";

import "../styles/Servicio.css";

function EditarServicio() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [
    servicio,
    setServicio,
  ] = useState(null);

  const [
    cargando,
    setCargando,
  ] = useState(true);

  const [
    guardando,
    setGuardando,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    formulario,
    setFormulario,
  ] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    ubicacion: "",
    imagen: "evento",
  });

  // =====================================================
  // CARGAR SERVICIO DESDE BACKEND
  // =====================================================

  useEffect(() => {
    let activo = true;

    async function cargarServicio() {
      try {
        setCargando(true);
        setError("");

        const datos =
          await obtenerServicioPorId(
            id
          );

        if (!activo) {
          return;
        }

        setServicio(datos);

        setFormulario({
          nombre:
            datos.nombre || "",
          categoria:
            datos.categoria || "",
          descripcion:
            datos.descripcion || "",
          precio:
            datos.precio || "",
          ubicacion:
            datos.ubicacion || "",
          imagen:
            datos.imagen ||
            "evento",
        });
      } catch (errorCarga) {
        console.error(
          "Error al cargar servicio:",
          errorCarga
        );

        if (activo) {
          setError(
            errorCarga.message ||
              "No fue posible cargar el servicio."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarServicio();

    return () => {
      activo = false;
    };
  }, [id]);

  // =====================================================
  // CAMBIAR FORMULARIO
  // =====================================================

  function manejarCambio(evento) {
    const {
      name,
      value,
    } = evento.target;

    setFormulario(
      (anterior) => ({
        ...anterior,
        [name]: value,
      })
    );
  }

  // =====================================================
  // GUARDAR CAMBIOS
  // =====================================================

  async function manejarSubmit(
    evento
  ) {
    evento.preventDefault();

    setError("");

    if (
      !formulario.nombre.trim() ||
      !formulario.categoria ||
      !formulario.descripcion.trim() ||
      !formulario.precio ||
      !formulario.ubicacion.trim()
    ) {
      setError(
        "Completa todos los campos obligatorios."
      );

      return;
    }

    if (
      Number(formulario.precio) <= 0
    ) {
      setError(
        "El precio debe ser mayor a $0."
      );

      return;
    }

    if (!servicio) {
      setError(
        "No fue posible identificar el servicio."
      );

      return;
    }

    try {
      setGuardando(true);

      await actualizarServicio(
        id,
        {
          ...formulario,
          perfilId:
            servicio.perfilId,
        }
      );

      navigate(
        `/perfil/${servicio.perfilId}`,
        {
          replace: true,
        }
      );
    } catch (errorGuardar) {
      console.error(
        "Error al actualizar servicio:",
        errorGuardar
      );

      setError(
        errorGuardar.message ||
          "No fue posible actualizar el servicio."
      );
    } finally {
      setGuardando(false);
    }
  }

  // =====================================================
  // CARGANDO
  // =====================================================

  if (cargando) {
    return (
      <>
        <Navbar />

        <main className="servicio-no-encontrado">
          <h2>
            Cargando servicio...
          </h2>
        </main>
      </>
    );
  }

  // =====================================================
  // NO ENCONTRADO
  // =====================================================

  if (!servicio) {
    return (
      <>
        <Navbar />

        <main className="servicio-no-encontrado">
          <h2>
            Servicio no encontrado
          </h2>

          {error && (
            <p>{error}</p>
          )}

          <Link to="/feed">
            Volver al feed
          </Link>
        </main>
      </>
    );
  }

  // =====================================================
  // FORMULARIO
  // =====================================================

  return (
    <>
      <Navbar />

      <main className="agregar-servicio">
        <section className="agregar-servicio-contenedor">

          <div className="agregar-servicio-titulo">
            <p className="servicio-etiqueta">
              EDITAR SERVICIO
            </p>

            <h1>
              Actualizar experiencia
            </h1>

            <p>
              Modifica la información
              del servicio publicado.
            </p>
          </div>

          <form
            className="formulario-servicio"
            onSubmit={
              manejarSubmit
            }
          >

            {error && (
              <p className="mensaje-error">
                {error}
              </p>
            )}

            <div className="campo-formulario">
              <label htmlFor="nombre">
                Nombre del servicio
              </label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                value={
                  formulario.nombre
                }
                onChange={
                  manejarCambio
                }
                disabled={guardando}
                required
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="categoria">
                Categoría
              </label>

              <select
                id="categoria"
                name="categoria"
                value={
                  formulario.categoria
                }
                onChange={
                  manejarCambio
                }
                disabled={guardando}
                required
              >
                <option value="">
                  Selecciona una
                  categoría
                </option>

                <option value="Acompañamiento">
                  Acompañamiento
                </option>

                <option value="Eventos">
                  Eventos
                </option>

                <option value="Cena">
                  Cena
                </option>

                <option value="Compañía">
                  Compañía
                </option>

                <option value="Experiencias">
                  Experiencias
                </option>
              </select>
            </div>

            <div className="campo-formulario campo-completo">
              <label htmlFor="descripcion">
                Descripción
              </label>

              <textarea
                id="descripcion"
                name="descripcion"
                value={
                  formulario.descripcion
                }
                onChange={
                  manejarCambio
                }
                rows="5"
                disabled={guardando}
                required
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="precio">
                Precio
              </label>

              <input
                id="precio"
                name="precio"
                type="number"
                min="1"
                value={
                  formulario.precio
                }
                onChange={
                  manejarCambio
                }
                disabled={guardando}
                required
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="ubicacion">
                Ubicación
              </label>

              <input
                id="ubicacion"
                name="ubicacion"
                type="text"
                value={
                  formulario.ubicacion
                }
                onChange={
                  manejarCambio
                }
                disabled={guardando}
                required
              />
            </div>

            <div className="campo-formulario campo-completo">
              <label htmlFor="imagen">
                Imagen de referencia
              </label>

              <select
                id="imagen"
                name="imagen"
                value={
                  formulario.imagen
                }
                onChange={
                  manejarCambio
                }
                disabled={guardando}
              >
                <option value="evento">
                  Evento
                </option>

                <option value="cena">
                  Cena
                </option>

                <option value="cine">
                  Cine
                </option>

                <option value="concierto">
                  Concierto
                </option>

                <option value="boda">
                  Boda
                </option>
              </select>
            </div>

            <div className="acciones-formulario">

              <Link
                to={`/perfil/${servicio.perfilId}`}
                className="boton-cancelar"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="boton-guardar"
                disabled={guardando}
              >
                {guardando
                  ? "Guardando..."
                  : "Guardar cambios"}
              </button>

            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditarServicio;