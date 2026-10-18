
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useRegistroUsuario } from "../data/RegistroUsuario.js";

import bannerR1 from "../assets/img/bannerR1.jpg";
import bannerR2 from "../assets/img/bannerR2.jpg";
import bannerR3 from "../assets/img/bannerR3.jpg";

import "../styles/RegistroUsuario.css";

// IMÁGENES Y FRASES DEL CARRUSEL
const imagenesRegistro = [
  {
    imagen: bannerR1,
    etiqueta: "DESCUBRE PRIVÉLINK",
    titulo: "Cada ocasión merece la compañía ideal",
    descripcion:
      "Explora perfiles y encuentra compañía para cenas, eventos y experiencias especiales.",
  },
  {
    imagen: bannerR2,
    etiqueta: "EXPERIENCIAS A TU MEDIDA",
    titulo: "Tu próxima experiencia comienza aquí",
    descripcion:
      "Elige entre diferentes perfiles y encuentra la compañía que mejor se adapte a tus intereses.",
  },
  {
    imagen: bannerR3,
    etiqueta: "MOMENTOS INOLVIDABLES",
    titulo: "Haz que cada encuentro sea especial",
    descripcion:
      "Comparte cenas, celebraciones y ocasiones únicas con la compañía adecuada.",
  },
];

function RegistroUsuario() {
  // LÓGICA DEL FORMULARIO DESDE EL ARCHIVO JS
  const {
    paso,
    datos,
    error,
    registroCompletado,
    actualizarCampo,
    siguiente,
    anterior,
    completarRegistro,
  } = useRegistroUsuario();

  // LÓGICA DEL CARRUSEL
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual(
        (anterior) =>
          (anterior + 1) % imagenesRegistro.length
      );
    }, 6000);

    return () => clearInterval(intervalo);
  }, []);

  const siguienteImagen = () => {
    setImagenActual(
      (anterior) =>
        (anterior + 1) % imagenesRegistro.length
    );
  };

  const anteriorImagen = () => {
    setImagenActual(
      (anterior) =>
        (anterior - 1 + imagenesRegistro.length) %
        imagenesRegistro.length
    );
  };


  const carrusel = (
    <aside
      className="registro-panel registro-panel-carrusel"
      aria-label="Experiencias PrivéLink"
    >
      {imagenesRegistro.map((imagen, index) => (
        <div
          key={index}
          className={`registro-slide ${
            index === imagenActual
              ? "registro-slide-activo"
              : ""
          }`}
          aria-hidden={index !== imagenActual}
        >
          <img
            src={imagen.imagen}
            alt=""
            className="registro-slide-imagen"
          />

          <div className="registro-slide-overlay" />

          <div className="registro-slide-contenido">
            <p className="registro-panel-etiqueta">
              {imagen.etiqueta}
            </p>

            <h2>{imagen.titulo}</h2>

            <p className="registro-panel-texto">
              {imagen.descripcion}
            </p>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="registro-carrusel-flecha registro-flecha-anterior"
        onClick={anteriorImagen}
        aria-label="Imagen anterior"
      >
        ‹
      </button>

      <button
        type="button"
        className="registro-carrusel-flecha registro-flecha-siguiente"
        onClick={siguienteImagen}
        aria-label="Imagen siguiente"
      >
        ›
      </button>

      <div className="registro-carrusel-indicadores">
        {imagenesRegistro.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`registro-carrusel-punto ${
              index === imagenActual ? "activo" : ""
            }`}
            onClick={() => setImagenActual(index)}
            aria-label={`Mostrar imagen ${index + 1}`}
            aria-current={
              index === imagenActual ? "true" : undefined
            }
          />
        ))}
      </div>
    </aside>
  );

  if (registroCompletado) {
    return (
      <main className="registro-pagina">
        <section className="registro-layout registro-layout-exito">

          <div className="registro-formulario registro-exito">
            <div className="registro-exito-icono">
              ✓
            </div>

            <p className="registro-etiqueta">
              PRIVÉLINK
            </p>

            <h1>¡Formulario completado!</h1>

            <p className="registro-subtexto">
              Has completado tus datos correctamente.
              La creación de tu cuenta estará disponible
              cuando conectemos el sistema de registro
              con el servidor.
            </p>

            <div className="registro-botones">
              <Link
                to="/login"
                className="registro-boton-principal"
              >
                Volver a iniciar sesión
              </Link>
            </div>
          </div>

          {carrusel}

        </section>
      </main>
    );
  }

  // FORMULARIO DE REGISTRO
  return (
    <main className="registro-pagina">
      <section className="registro-layout">

        {/* COLUMNA IZQUIERDA */}

        <div className="registro-formulario">

          {/* ENCABEZADO */}

          <div className="registro-encabezado">
            <p className="registro-etiqueta">
              BIENVENIDO A PRIVÉLINK
            </p>

            <h1>Crea tu cuenta</h1>

            <p className="registro-subtexto">
              Regístrate para acceder a experiencias
              exclusivas y encontrar la compañía ideal
              para cada ocasión.
            </p>
          </div>

          {/* INDICADOR DE PROGRESO */}

          <div className="registro-progreso">

            <div
              className={`registro-paso ${
                paso >= 1 ? "activo" : ""
              }`}
            >
              <span>1</span>
              <small>Personal</small>
            </div>

            <div className="registro-linea" />

            <div
              className={`registro-paso ${
                paso >= 2 ? "activo" : ""
              }`}
            >
              <span>2</span>
              <small>Acceso</small>
            </div>

            <div className="registro-linea" />

            <div
              className={`registro-paso ${
                paso >= 3 ? "activo" : ""
              }`}
            >
              <span>3</span>
              <small>Confirmación</small>
            </div>

          </div>

          <form onSubmit={completarRegistro} noValidate>

            {/* PASO 1: DATOS PERSONALES */}

            {paso === 1 && (
              <div className="registro-seccion">

                <h2>Datos personales</h2>

                <p className="registro-seccion-texto">
                  Cuéntanos un poco sobre ti para
                  personalizar tu experiencia.
                </p>

                <div className="registro-grid">

                  <div className="registro-campo">
                    <label htmlFor="nombre">
                      Nombre
                    </label>

                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={datos.nombre}
                      onChange={actualizarCampo}
                      placeholder="Ingresa tu nombre"
                      autoComplete="given-name"
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="apellido">
                      Apellido
                    </label>

                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={datos.apellido}
                      onChange={actualizarCampo}
                      placeholder="Ingresa tu apellido"
                      autoComplete="family-name"
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="fechaNacimiento">
                      Fecha de nacimiento
                    </label>

                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      value={datos.fechaNacimiento}
                      onChange={actualizarCampo}
                      autoComplete="bday"
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="region">
                      Región
                    </label>

                    <select
                      id="region"
                      name="region"
                      value={datos.region}
                      onChange={actualizarCampo}
                      required
                    >
                      <option value="">
                        Selecciona tu región
                      </option>

                      <option value="metropolitana">
                        Metropolitana
                      </option>

                      <option value="valparaiso">
                        Valparaíso
                      </option>

                      <option value="biobio">
                        Biobío
                      </option>

                      <option value="maule">
                        Maule
                      </option>

                      <option value="araucania">
                        La Araucanía
                      </option>

                      <option value="otra">
                        Otra región
                      </option>
                    </select>
                  </div>

                  <div className="registro-campo registro-campo-ancho">
                    <label htmlFor="comuna">
                      Comuna
                    </label>

                    <input
                      type="text"
                      id="comuna"
                      name="comuna"
                      value={datos.comuna}
                      onChange={actualizarCampo}
                      placeholder="Ingresa tu comuna"
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                </div>
              </div>
            )}

            {/* PASO 2: DATOS DE ACCESO */}

            {paso === 2 && (
              <div className="registro-seccion">

                <h2>Datos de acceso</h2>

                <p className="registro-seccion-texto">
                  Crea las credenciales que utilizarás
                  para ingresar a PrivéLink.
                </p>

                <div className="registro-campo">
                  <label htmlFor="correo">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={datos.correo}
                    onChange={actualizarCampo}
                    placeholder="correo@ejemplo.cl"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="registro-campo">
                  <label htmlFor="contrasena">
                    Contraseña
                  </label>

                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    value={datos.contrasena}
                    onChange={actualizarCampo}
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div className="registro-campo">
                  <label htmlFor="confirmarContrasena">
                    Confirmar contraseña
                  </label>

                  <input
                    type="password"
                    id="confirmarContrasena"
                    name="confirmarContrasena"
                    value={datos.confirmarContrasena}
                    onChange={actualizarCampo}
                    placeholder="Repite tu contraseña"
                    autoComplete="new-password"
                    required
                  />
                </div>

              </div>
            )}

            {/* PASO 3: CONFIRMACIÓN */}

            {paso === 3 && (
              <div className="registro-seccion">

                <h2>Confirma tus datos</h2>

                <p className="registro-seccion-texto">
                  Revisa tu información antes de
                  continuar.
                </p>

                <div className="registro-resumen">

                  <div className="registro-resumen-item">
                    <span>Nombre</span>

                    <strong>
                      {datos.nombre} {datos.apellido}
                    </strong>
                  </div>

                  <div className="registro-resumen-item">
                    <span>Fecha de nacimiento</span>

                    <strong>
                      {datos.fechaNacimiento}
                    </strong>
                  </div>

                  <div className="registro-resumen-item">
                    <span>Ubicación</span>

                    <strong>
                      {datos.comuna}, {datos.region}
                    </strong>
                  </div>

                  <div className="registro-resumen-item">
                    <span>Correo electrónico</span>

                    <strong>
                      {datos.correo}
                    </strong>
                  </div>

                </div>

                <label className="registro-check">
                  <input
                    type="checkbox"
                    name="aceptaTerminos"
                    checked={datos.aceptaTerminos}
                    onChange={actualizarCampo}
                  />

                  <span>
                    Acepto los términos y condiciones
                    de PrivéLink.
                  </span>
                </label>

                <label className="registro-check">
                  <input
                    type="checkbox"
                    name="aceptaPrivacidad"
                    checked={datos.aceptaPrivacidad}
                    onChange={actualizarCampo}
                  />

                  <span>
                    Acepto la política de privacidad
                    de PrivéLink.
                  </span>
                </label>

              </div>
            )}

            {/* MENSAJES DE ERROR */}

            {error && (
              <p className="registro-error" role="alert">
                {error}
              </p>
            )}

            {/* BOTONES DEL FORMULARIO */}

            <div className="registro-botones">

              {paso > 1 && (
                <button
                  type="button"
                  className="registro-boton-secundario"
                  onClick={anterior}
                >
                  ← Anterior
                </button>
              )}

              {paso < 3 ? (
                <button
                  type="button"
                  className="registro-boton-principal"
                  onClick={siguiente}
                >
                  Continuar →
                </button>
              ) : (
                <button
                  type="submit"
                  className="registro-boton-principal"
                >
                  Completar formulario
                </button>
              )}

            </div>

          </form>

          {/* ENLACE AL LOGIN */}

          <div className="registro-pie">
            <p>¿Ya tienes una cuenta?</p>

            <Link to="/login">
              Inicia sesión aquí
            </Link>
          </div>

        </div>

        {/* COLUMNA DERECHA: CARRUSEL */}

        {carrusel}

      </section>
    </main>
  );
}

export default RegistroUsuario;
