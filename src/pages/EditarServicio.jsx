import { useState } from "react";
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
  const navigate = useNavigate();

  const servicio = obtenerServicioPorId(id);

  const [formulario, setFormulario] = useState({
    nombre: servicio?.nombre || "",
    categoria: servicio?.categoria || "",
    descripcion: servicio?.descripcion || "",
    precio: servicio?.precio || "",
    ubicacion: servicio?.ubicacion || "",
    imagen: servicio?.imagen || "evento",
  });

  const [error, setError] = useState("");

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarSubmit(evento) {
    evento.preventDefault();

    if (
      !formulario.nombre.trim() ||
      !formulario.categoria ||
      !formulario.descripcion.trim() ||
      !formulario.precio ||
      !formulario.ubicacion.trim()
    ) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    if (Number(formulario.precio) <= 0) {
      setError("El precio debe ser mayor a $0.");
      return;
    }

    actualizarServicio(id, formulario);

    navigate(`/perfil/${servicio.perfilId}`);
  }

  if (!servicio) {
    return (
      <>
        <Navbar />

        <main className="servicio-no-encontrado">
          <h2>Servicio no encontrado</h2>

          <Link to="/feed">
            Volver al feed
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="agregar-servicio">
        <section className="agregar-servicio-contenedor">
          <div className="agregar-servicio-titulo">
            <p className="servicio-etiqueta">
              EDITAR SERVICIO
            </p>

            <h1>Actualizar experiencia</h1>

            <p>
              Modifica la información del servicio publicado.
            </p>
          </div>

          <form
            className="formulario-servicio"
            onSubmit={manejarSubmit}
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
                value={formulario.nombre}
                onChange={manejarCambio}
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="categoria">
                Categoría
              </label>

              <select
                id="categoria"
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
              >
                <option value="">
                  Selecciona una categoría
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
                value={formulario.descripcion}
                onChange={manejarCambio}
                rows="5"
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
                value={formulario.precio}
                onChange={manejarCambio}
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
                value={formulario.ubicacion}
                onChange={manejarCambio}
              />
            </div>

            <div className="campo-formulario campo-completo">
              <label htmlFor="imagen">
                Imagen de referencia
              </label>

              <select
                id="imagen"
                name="imagen"
                value={formulario.imagen}
                onChange={manejarCambio}
              >
                <option value="evento">Evento</option>
                <option value="cena">Cena</option>
                <option value="cine">Cine</option>
                <option value="concierto">Concierto</option>
                <option value="boda">Boda</option>
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
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default EditarServicio;