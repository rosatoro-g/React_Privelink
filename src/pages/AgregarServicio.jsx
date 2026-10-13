import { useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import perfiles from "../data/Perfiles";
import { crearServicio } from "../data/Servicios";

import "../styles/Servicio.css";

function AgregarServicio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const perfilId = Number(
    searchParams.get("perfil") || 1
  );

  const perfil = perfiles.find(
    (perfil) => perfil.id === perfilId
  );

  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    ubicacion: perfil?.ubicacion || "",
    imagen: "evento",
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

    crearServicio({
      ...formulario,
      perfilId,
    });

    navigate(`/perfil/${perfilId}`);
  }

  if (!perfil) {
    return (
      <>
        <Navbar />

        <main className="servicio-no-encontrado">
          <h2>Perfil no encontrado</h2>

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
              NUEVO SERVICIO
            </p>

            <h1>Publicar experiencia</h1>

            <p>
              Agrega un nuevo servicio al perfil de{" "}
              <strong>{perfil.nombre}</strong>.
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
                placeholder="Ej: Cena y compañía"
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
                placeholder="Describe brevemente la experiencia..."
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
                placeholder="40000"
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
                placeholder="Valdivia"
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
                to={`/perfil/${perfilId}`}
                className="boton-cancelar"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="boton-guardar"
              >
                Publicar servicio
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default AgregarServicio;