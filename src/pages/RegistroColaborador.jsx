import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import logoPrivelink from "../assets/img/logo privelink.png";

import servicioCine from "../assets/img/servicio-cine.jpg";
import servicioCena from "../assets/img/servicio-cena.jpg";
import servicioEvento from "../assets/img/servicio-evento.jpg";

import "../styles/Registro.css";

const API_URL =
  "http://localhost:8080";

// =========================================================
// CONVERTIR FOTO A DATA URL
// =========================================================

function convertirImagenADataURL(
  archivo
) {
  return new Promise(
    (resolve, reject) => {
      const lector =
        new FileReader();

      lector.onload = () =>
        resolve(
          lector.result
        );

      lector.onerror = () =>
        reject(
          new Error(
            "No fue posible procesar la fotografía."
          )
        );

      lector.readAsDataURL(
        archivo
      );
    }
  );
}

// =========================================================
// EXTRAER PRECIO DESDE TEXTO
// =========================================================

function obtenerPrecioNumerico(
  tarifa
) {
  const soloNumeros =
    String(tarifa)
      .replace(/\D/g, "");

  return Number(
    soloNumeros || 0
  );
}

// =========================================================
// COMPONENTE
// =========================================================

export default function RegistroColaborador() {
  const navigate =
    useNavigate();

  const [paso, setPaso] =
    useState(1);

  const [
    formData,
    setFormData,
  ] = useState({
    nombre: "",
    apodo: "",
    edad: "",
    telefono: "",

    correo: "",
    contrasena: "",
    confirmarContrasena: "",

    comuna: "",
    tarifas: "",
    descripcion: "",

    fotos: null,
  });

  const [error, setError] =
    useState("");

  const [
    cargando,
    setCargando,
  ] = useState(false);

  // =====================================================
  // CAMBIAR CAMPOS
  // =====================================================

  const handleChange = (
    evento
  ) => {
    const {
      id,
      value,
      files,
    } = evento.target;

    setFormData(
      (prev) => ({
        ...prev,

        [id]:
          files
            ? files
            : value,
      })
    );

    setError("");
  };

  // =====================================================
  // VALIDAR PASO 1
  // =====================================================

  const validarPaso1 = () => {
    if (
      !formData.nombre.trim() ||
      !formData.apodo.trim() ||
      !formData.edad ||
      !formData.telefono.trim() ||
      !formData.correo.trim() ||
      !formData.contrasena ||
      !formData.confirmarContrasena
    ) {
      setError(
        "Completa todos los datos personales y de acceso."
      );

      return false;
    }

    if (
      Number(formData.edad) <
      18
    ) {
      setError(
        "Debes ser mayor de 18 años."
      );

      return false;
    }

    const correoValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.correo.trim()
      );

    if (!correoValido) {
      setError(
        "Ingresa un correo electrónico válido."
      );

      return false;
    }

    if (
      formData.contrasena
        .length < 12 ||
      formData.contrasena
        .length > 72
    ) {
      setError(
        "La contraseña debe tener entre 12 y 72 caracteres."
      );

      return false;
    }

    if (
      formData.contrasena !==
      formData.confirmarContrasena
    ) {
      setError(
        "Las contraseñas no coinciden."
      );

      return false;
    }

    setError("");

    return true;
  };

  // =====================================================
  // VALIDAR PASO 2
  // =====================================================

  const validarPaso2 = () => {
    if (
      !formData.comuna.trim() ||
      !formData.tarifas.trim() ||
      !formData.descripcion.trim()
    ) {
      setError(
        "Completa los detalles del servicio."
      );

      return false;
    }

    setError("");

    return true;
  };

  // =====================================================
  // SIGUIENTE
  // =====================================================

  const siguientePaso = () => {
    if (
      paso === 1 &&
      !validarPaso1()
    ) {
      return;
    }

    if (
      paso === 2 &&
      !validarPaso2()
    ) {
      return;
    }

    setPaso(
      (prev) =>
        Math.min(
          prev + 1,
          3
        )
    );
  };

  // =====================================================
  // ANTERIOR
  // =====================================================

  const anteriorPaso = () => {
    setError("");

    setPaso(
      (prev) =>
        Math.max(
          prev - 1,
          1
        )
    );
  };

  // =====================================================
  // REGISTRO
  // =====================================================

  const handleSubmit = async (
    evento
  ) => {
    evento.preventDefault();

    setError("");

    if (
      !formData.fotos ||
      formData.fotos.length ===
        0
    ) {
      setError(
        "Selecciona al menos una fotografía."
      );

      return;
    }

    try {
      setCargando(true);

      // ===============================================
      // 1. REGISTRAR USUARIO EN SPRING BOOT
      // ===============================================

      const respuesta =
        await fetch(
          `${API_URL}/api/auth/registro-colaborador`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify({
                nombre:
                  formData.nombre.trim(),

                correo:
                  formData.correo
                    .trim()
                    .toLowerCase(),

                password:
                  formData.contrasena,
              }),
          }
        );

      let datos = {};

      try {
        datos =
          await respuesta.json();
      } catch {
        datos = {};
      }

      if (!respuesta.ok) {
        if (
          respuesta.status ===
          409
        ) {
          throw new Error(
            "Este correo electrónico ya está registrado."
          );
        }

        throw new Error(
          datos.mensaje ||
            "No fue posible completar el registro."
        );
      }

      // ===============================================
      // 2. PROCESAR FOTO DEL PERFIL
      // ===============================================

      const fotoPrincipal =
        await convertirImagenADataURL(
          formData.fotos[0]
        );

      // ===============================================
      // 3. CREAR PERFIL LOCAL ASOCIADO AL USUARIO
      // ===============================================

      const perfilId =
        Date.now();

      const nuevoPerfil = {
        id:
          perfilId,

        usuarioId:
          datos.id,

        correo:
          formData.correo
            .trim()
            .toLowerCase(),

        nombre:
          formData.apodo.trim() ||
          formData.nombre.trim(),

        nombreCompleto:
          formData.nombre.trim(),

        edad:
          Number(
            formData.edad
          ),

        telefono:
          formData.telefono.trim(),

        ubicacion:
          formData.comuna.trim(),

        descripcion:
          formData.descripcion.trim(),

        precio:
          obtenerPrecioNumerico(
            formData.tarifas
          ),

        tarifaTexto:
          formData.tarifas.trim(),

        imagen:
          fotoPrincipal,

        verificado:
          false,

        disponibilidad:
          "Disponible hoy",

        servicios: [
          "Acompañamiento",
          "Eventos",
          "Experiencias",
        ],
      };

      // ===============================================
      // 4. GUARDAR PERFIL
      // ===============================================

      let perfiles = [];

      try {
        perfiles =
          JSON.parse(
            localStorage.getItem(
              "privelink_perfiles_colaborador"
            ) || "[]"
          );
      } catch {
        perfiles = [];
      }

      perfiles.push(
        nuevoPerfil
      );

      localStorage.setItem(
        "privelink_perfiles_colaborador",
        JSON.stringify(
          perfiles
        )
      );

      // ===============================================
      // 5. REGISTRO COMPLETADO
      // ===============================================

      alert(
        "¡Cuenta de colaborador creada exitosamente! Ya puedes iniciar sesión."
      );

      navigate(
        "/login",
        {
          replace: true,
        }
      );
    } catch (
      errorRegistro
    ) {
      console.error(
        "Error al registrar colaborador:",
        errorRegistro
      );

      setError(
        errorRegistro.message ||
          "No fue posible completar el registro."
      );
    } finally {
      setCargando(false);
    }
  };

  // =====================================================
  // INTERFAZ
  // =====================================================

  return (
    <div className="registro-page">
      <div className="registro-panel">

        <div className="registro-formulario">

          <span className="registro-etiqueta">
            NUEVO COLABORADOR
          </span>

          <h1>
            Únete al equipo
          </h1>

          <p className="registro-descripcion">
            Completa tus datos para publicar tu perfil en PrivéLink.
          </p>

          {/* PROGRESO */}

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
                  paso >= 1
                    ? "activo"
                    : ""
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
                  paso >= 2
                    ? "activo"
                    : ""
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
                  paso >= 3
                    ? "activo"
                    : ""
                }`}
              >
                3
              </div>

              <span className="registro-paso-texto">
                Fotos
              </span>
            </div>

          </div>

          <form
            onSubmit={
              handleSubmit
            }
          >

            {error && (
              <p
                style={{
                  color:
                    "#B42318",

                  background:
                    "#FEF3F2",

                  padding:
                    "10px 12px",

                  borderRadius:
                    "8px",

                  marginBottom:
                    "16px",

                  fontSize:
                    "13px",
                }}
              >
                {error}
              </p>
            )}

            {/* PASO 1 */}

            {paso === 1 && (
              <div className="registro-seccion">

                <h2>
                  1. Información Personal
                </h2>

                <div className="registro-campos">

                  <div className="registro-campo">
                    <label htmlFor="nombre">
                      Nombre completo
                    </label>

                    <input
                      type="text"
                      id="nombre"
                      placeholder="Ej: Sofía Silva"
                      value={
                        formData.nombre
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
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
                      placeholder="Ej: Sofi"
                      value={
                        formData.apodo
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
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
                      min="18"
                      placeholder="18+"
                      value={
                        formData.edad
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
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
                      value={
                        formData.telefono
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
                      required
                    />
                  </div>

                  <div className="registro-campo">
                    <label htmlFor="correo">
                      Correo electrónico
                    </label>

                    <input
                      type="email"
                      id="correo"
                      placeholder="correo@ejemplo.cl"
                      value={
                        formData.correo
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
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
                      placeholder="Mínimo 12 caracteres"
                      minLength="12"
                      maxLength="72"
                      value={
                        formData.contrasena
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
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
                      placeholder="Repite tu contraseña"
                      minLength="12"
                      maxLength="72"
                      value={
                        formData.confirmarContrasena
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
                      required
                    />
                  </div>

                </div>

                <button
                  type="button"
                  className="registro-boton principal"
                  onClick={
                    siguientePaso
                  }
                  disabled={
                    cargando
                  }
                >
                  Continuar
                </button>

              </div>
            )}

            {/* PASO 2 */}

            {paso === 2 && (
              <div className="registro-seccion">

                <h2>
                  2. Detalles del Servicio
                </h2>

                <div className="registro-campos una-columna">

                  <div className="registro-campo">
                    <label htmlFor="comuna">
                      Comuna / Ciudad
                    </label>

                    <input
                      type="text"
                      id="comuna"
                      placeholder="Ej: Valdivia"
                      value={
                        formData.comuna
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
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
                      placeholder="Ej: $40.000"
                      value={
                        formData.tarifas
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
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
                      value={
                        formData.descripcion
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        cargando
                      }
                      required
                    ></textarea>
                  </div>

                </div>

                <div className="registro-botones">

                  <button
                    type="button"
                    className="registro-boton secundario"
                    onClick={
                      anteriorPaso
                    }
                    disabled={
                      cargando
                    }
                  >
                    Volver
                  </button>

                  <button
                    type="button"
                    className="registro-boton principal"
                    onClick={
                      siguientePaso
                    }
                    disabled={
                      cargando
                    }
                  >
                    Continuar
                  </button>

                </div>
              </div>
            )}

            {/* PASO 3 */}

            {paso === 3 && (
              <div className="registro-seccion">

                <h2>
                  3. Fotografías
                </h2>

                <div className="registro-subir-fotos">

                  <span className="registro-icono-foto">
                    📸
                  </span>

                  <strong>
                    Selecciona tus mejores fotos
                  </strong>

                  <span
                    style={{
                      fontSize:
                        "12px",

                      color:
                        "#777985",
                    }}
                  >
                    JPG o PNG recomendados
                  </span>

                  <input
                    type="file"
                    id="fotos"
                    accept="image/*"
                    multiple
                    onChange={
                      handleChange
                    }
                    disabled={
                      cargando
                    }
                    required
                  />

                  {formData.fotos && (
                    <p
                      style={{
                        color:
                          "#304FA8",

                        fontSize:
                          "13px",

                        fontWeight:
                          "bold",
                      }}
                    >
                      {
                        formData
                          .fotos
                          .length
                      }{" "}
                      archivo(s) seleccionado(s)
                    </p>
                  )}

                </div>

                <div className="registro-botones">

                  <button
                    type="button"
                    className="registro-boton secundario"
                    onClick={
                      anteriorPaso
                    }
                    disabled={
                      cargando
                    }
                  >
                    Volver
                  </button>

                  <button
                    type="submit"
                    className="registro-boton principal"
                    disabled={
                      cargando
                    }
                  >
                    {cargando
                      ? "Registrando..."
                      : "Finalizar Registro"}
                  </button>

                </div>
              </div>
            )}

          </form>
        </div>

        {/* PANEL LATERAL */}

        <div className="registro-lateral">

          <div>

            <div className="registro-logo-contenedor">
              <img
                src={
                  logoPrivelink
                }
                alt="PrivéLink Logo"
                className="registro-logo"
              />
            </div>

            <div className="registro-mensaje">
              <h2>
                Conexiones exclusivas y flexibilidad
              </h2>

              <span>
                Sé parte de la red PrivéLink y gestiona tu tiempo con absoluta autonomía.
              </span>
            </div>

          </div>

          <div className="registro-tarjetas">

            <div className="registro-tarjeta">
              <img
                src={
                  servicioCine
                }
                alt="Cine"
              />

              <span>
                Cine &amp; Teatro
              </span>
            </div>

            <div className="registro-tarjeta">
              <img
                src={
                  servicioCena
                }
                alt="Cena"
              />

              <span>
                Cenas &amp; Restobar
              </span>
            </div>

            <div className="registro-tarjeta">
              <img
                src={
                  servicioEvento
                }
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