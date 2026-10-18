import React, { useState } from "react";

import logoPrivelink from "../assets/img/logo privelink.png";
import servicioCine from "../assets/img/servicio-cine.jpg";
import servicioCena from "../assets/img/servicio-cena.jpg";
import servicioEvento from "../assets/img/servicio-evento.jpg";

import "../styles/Registro.css";

export default function RegistroColaborador() {
  const [paso, setPaso] = useState(1);

  const [formData, setFormData] = useState({
    nombre: "",
    apodo: "",
    edad: "",
    telefono: "",
    comuna: "",
    tarifas: "",
    descripcion: "",
    fotos: null,
  });

  const handleChange = (evento) => {
    const { id, value, files } = evento.target;

    setFormData((prev) => ({
      ...prev,
      [id]: files ? files : value,
    }));
  };

  const siguientePaso = () => {
    setPaso((prev) => Math.min(prev + 1, 3));
  };

  const anteriorPaso = () => {
    setPaso((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    alert("¡Perfil creado exitosamente!");
  };

  return (
    <div className="registro-page">
      <div className="registro-panel">
        <div className="registro-formulario">
          <span className="registro-etiqueta">
            NUEVO COLABORADOR
          </span>

          <h1>Únete al equipo</h1>

          <p className="registro-descripcion">
            Completa tus datos para publicar tu perfil en PrivéLink.
          </p>

          <div className="registro-progreso">
            <div className="registro-linea">
              <div
                className="registro-linea-completada"
                style={{
                  width:
                    paso === 1
                      ? "0%"
                      : paso === 2
                        ? "50%"
                        : "100%",
                }}
              ></div>
            </div>

            <div className="registro-paso">
              <div
                className={`registro-circulo ${
                  paso >= 1 ? "activo" : ""
                }`}
              >
                1
              </div>

              <span className="registro-paso-texto">
                Personal
              </span>
            </div>

            <div className="registro-paso">
              <div
                className={`registro-circulo ${
                  paso >= 2 ? "activo" : ""
                }`}
              >
                2
              </div>

              <span className="registro-paso-texto">
                Servicios
              </span>
            </div>

            <div className="registro-paso">
              <div
                className={`registro-circulo ${
                  paso >= 3 ? "activo" : ""
                }`}
              >
                3
              </div>

              <span className="registro-paso-texto">
                Fotos
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {paso === 1 && (
              <div className="registro-seccion">
                <h2>1. Información Personal</h2>

                <div className="registro-campos">
                  <div className="registro-campo">
                    <label htmlFor="nombre">
                      Nombre completo
                    </label>

                    <input
                      type="text"
                      id="nombre"
                      placeholder="Ej: Sofía Silva"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="apodo">
                      Apodo / Nombre Artístico
                    </label>

                    <input
                      type="text"
                      id="apodo"
                      placeholder="Ej: @Sofi"
                      value={formData.apodo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="edad">
                      Edad
                    </label>

                    <input
                      type="number"
                      id="edad"
                      placeholder="18+"
                      min="18"
                      value={formData.edad}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="telefono">
                      Teléfono / WhatsApp
                    </label>

                    <input
                      type="tel"
                      id="telefono"
                      placeholder="+56 9 1234 5678"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="registro-boton principal"
                  onClick={siguientePaso}
                >
                  Continuar
                </button>
              </div>
            )}

            {paso === 2 && (
              <div className="registro-seccion">
                <h2>2. Detalles del Servicio</h2>

                <div className="registro-campos una-columna">
                  <div className="registro-campo">
                    <label htmlFor="comuna">
                      Comuna / Ciudad
                    </label>

                    <input
                      type="text"
                      id="comuna"
                      placeholder="Ej: Valdivia"
                      value={formData.comuna}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="tarifas">
                      Tarifas
                    </label>

                    <input
                      type="text"
                      id="tarifas"
                      placeholder="Ej: $40.000 / hora"
                      value={formData.tarifas}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="descripcion">
                      Presentación / Sobre mí
                    </label>

                    <textarea
                      id="descripcion"
                      rows="3"
                      placeholder="Describe tus servicios..."
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="registro-botones">
                  <button
                    type="button"
                    className="registro-boton secundario"
                    onClick={anteriorPaso}
                  >
                    Volver
                  </button>

                  <button
                    type="button"
                    className="registro-boton principal"
                    onClick={siguientePaso}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {paso === 3 && (
              <div className="registro-seccion">
                <h2>3. Fotografías</h2>

                <div className="registro-subir-fotos">
                  <span className="registro-icono-foto">
                    📸
                  </span>

                  <strong>
                    Selecciona tus mejores fotos
                  </strong>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#777985",
                    }}
                  >
                    JPG o PNG recomendados
                  </span>

                  <input
                    type="file"
                    id="fotos"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                    required
                  />

                  {formData.fotos && (
                    <p
                      style={{
                        color: "#304FA8",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {formData.fotos.length} archivo(s) seleccionado(s)
                    </p>
                  )}
                </div>

                <div className="registro-botones">
                  <button
                    type="button"
                    className="registro-boton secundario"
                    onClick={anteriorPaso}
                  >
                    Volver
                  </button>

                  <button
                    type="submit"
                    className="registro-boton principal"
                  >
                    Finalizar Registro
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="registro-lateral">
          <div>
            <div className="registro-logo-contenedor">
              <img
                src={logoPrivelink}
                alt="PrivéLink Logo"
                className="registro-logo"
              />
            </div>

            <div className="registro-mensaje">
              <h2>
                Conexiones exclusivas y flexibilidad
              </h2>

              <span>
                Sé parte de la red PrivéLink y gestiona tu tiempo
                con absoluta autonomía.
              </span>
            </div>
          </div>

          <div className="registro-tarjetas">
            <div className="registro-tarjeta">
              <img
                src={servicioCine}
                alt="Cine"
              />

              <span>
                Cine &amp; Teatro
              </span>
            </div>

            <div className="registro-tarjeta">
              <img
                src={servicioCena}
                alt="Cena"
              />

              <span>
                Cenas &amp; Restobar
              </span>
            </div>

            <div className="registro-tarjeta">
              <img
                src={servicioEvento}
                alt="Eventos"
              />

              <span>
                Eventos &amp; Galas
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}