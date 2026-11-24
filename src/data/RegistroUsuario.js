import { useState } from "react";

const API_URL = "http://localhost:8080";

const datosIniciales = {
  nombre: "",
  apellido: "",
  fechaNacimiento: "",
  region: "",
  comuna: "",
  correo: "",
  contrasena: "",
  confirmarContrasena: "",
  aceptaTerminos: false,
  aceptaPrivacidad: false,
};

export function useRegistroUsuario() {
  const [paso, setPaso] = useState(1);

  const [datos, setDatos] =
    useState(datosIniciales);

  const [error, setError] =
    useState("");

  const [
    registroCompletado,
    setRegistroCompletado,
  ] = useState(false);

  const [cargando, setCargando] =
    useState(false);

  // =====================================================
  // ACTUALIZAR CAMPOS
  // =====================================================

  const actualizarCampo = (evento) => {
    const {
      name,
      value,
      type,
      checked,
    } = evento.target;

    setDatos((anterior) => ({
      ...anterior,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");
  };

  // =====================================================
  // VALIDAR MAYORÍA DE EDAD
  // =====================================================

  const esMayorDeEdad = (fecha) => {
    if (!fecha) {
      return false;
    }

    const nacimiento =
      new Date(`${fecha}T00:00:00`);

    if (
      Number.isNaN(
        nacimiento.getTime()
      )
    ) {
      return false;
    }

    const hoy = new Date();

    if (nacimiento > hoy) {
      return false;
    }

    let edad =
      hoy.getFullYear() -
      nacimiento.getFullYear();

    const diferenciaMes =
      hoy.getMonth() -
      nacimiento.getMonth();

    if (
      diferenciaMes < 0 ||
      (
        diferenciaMes === 0 &&
        hoy.getDate() <
          nacimiento.getDate()
      )
    ) {
      edad--;
    }

    return edad >= 18 &&
      edad <= 120;
  };

  // =====================================================
  // VALIDAR PASO
  // =====================================================

  const validarPaso = () => {
    // PASO 1
    if (paso === 1) {
      if (
        !datos.nombre.trim() ||
        !datos.apellido.trim() ||
        !datos.fechaNacimiento ||
        !datos.region ||
        !datos.comuna.trim()
      ) {
        setError(
          "Debes completar todos tus datos personales."
        );

        return false;
      }

      if (
        !esMayorDeEdad(
          datos.fechaNacimiento
        )
      ) {
        setError(
          "Debes ser mayor de 18 años e ingresar una fecha válida."
        );

        return false;
      }
    }

    // PASO 2
    if (paso === 2) {
      const correoValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          datos.correo.trim()
        );

      if (!correoValido) {
        setError(
          "Ingresa un correo electrónico válido."
        );

        return false;
      }

      /*
       * El backend exige entre
       * 12 y 72 caracteres.
       */
      if (
        datos.contrasena.length < 12 ||
        datos.contrasena.length > 72
      ) {
        setError(
          "La contraseña debe tener entre 12 y 72 caracteres."
        );

        return false;
      }

      if (
        datos.contrasena !==
        datos.confirmarContrasena
      ) {
        setError(
          "Las contraseñas no coinciden."
        );

        return false;
      }
    }

    setError("");

    return true;
  };

  // =====================================================
  // SIGUIENTE PASO
  // =====================================================

  const siguiente = () => {
    if (validarPaso()) {
      setPaso((anterior) =>
        Math.min(
          anterior + 1,
          3
        )
      );
    }
  };

  // =====================================================
  // PASO ANTERIOR
  // =====================================================

  const anterior = () => {
    setError("");

    setPaso((anterior) =>
      Math.max(
        anterior - 1,
        1
      )
    );
  };

  // =====================================================
  // REGISTRO REAL CONTRA SPRING BOOT
  // =====================================================

  const completarRegistro =
    async (evento) => {

    evento.preventDefault();

    if (paso !== 3) {
      return;
    }

    if (
      !datos.aceptaTerminos ||
      !datos.aceptaPrivacidad
    ) {
      setError(
        "Debes aceptar los términos y la política de privacidad."
      );

      return;
    }

    const correoNormalizado =
      datos.correo
        .trim()
        .toLowerCase();

    const nombreCompleto =
      `${datos.nombre.trim()} ${datos.apellido.trim()}`;

    try {
      setCargando(true);
      setError("");

      const respuesta =
        await fetch(
          `${API_URL}/api/auth/registro`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },

            body: JSON.stringify({
              nombre:
                nombreCompleto,
              correo:
                correoNormalizado,
              password:
                datos.contrasena,
            }),
          }
        );

      let respuestaBackend = {};

      try {
        respuestaBackend =
          await respuesta.json();
      } catch {
        respuestaBackend = {};
      }

      // =================================================
      // ERROR
      // =================================================

      if (!respuesta.ok) {
        if (
          respuesta.status === 409
        ) {
          throw new Error(
            "Este correo electrónico ya está registrado."
          );
        }

        throw new Error(
          respuestaBackend.mensaje ||
          "No fue posible completar el registro."
        );
      }

      // =================================================
      // REGISTRO EXITOSO
      // =================================================

      /*
       * Ya NO guardamos:
       *
       * - contraseña
       * - usuarios registrados
       *
       * en localStorage.
       *
       * Spring Boot + MongoDB se encargan
       * del registro y BCrypt de la contraseña.
       */

      setError("");

      setRegistroCompletado(true);

    } catch (errorRegistro) {
      console.error(
        "Error al registrar usuario:",
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
  // RETORNO DEL HOOK
  // =====================================================

  return {
    paso,

    datos,

    error,

    registroCompletado,

    cargando,

    actualizarCampo,

    siguiente,

    anterior,

    completarRegistro,
  };
}