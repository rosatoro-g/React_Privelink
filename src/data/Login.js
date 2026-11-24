import { useState } from "react";
import { useNavigate } from "react-router-dom";

// =========================================================
// CONFIGURACIÓN API
// =========================================================

const API_URL = "http://localhost:8080";

// =========================================================
// RUTAS SEGÚN ROL DEL BACKEND
// =========================================================

const rutasPorRol = {
  ADMIN: "/inicio-admin",
  CLIENTE: "/feed",
  COLABORADOR: "/perfil/1",
};

// =========================================================
// CONVERSIÓN DE ROLES
// =========================================================

const rolFrontendPorBackend = {
  ADMIN: "administrador",
  CLIENTE: "cliente",
  COLABORADOR: "colaborador",
};

const rolBackendPorFrontend = {
  administrador: "ADMIN",
  cliente: "CLIENTE",
  colaborador: "COLABORADOR",
};

// =========================================================
// HOOK LOGIN
// =========================================================

export function useLogin() {
  const navigate = useNavigate();

  const [rol, setRol] = useState("cliente");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarLogin = async (evento) => {
    evento.preventDefault();

    setError("");

    // =====================================================
    // VALIDAR CAMPOS
    // =====================================================

    const correoNormalizado =
      correo.trim().toLowerCase();

    if (!correoNormalizado || !contrasena.trim()) {
      setError(
        "Ingresa tu correo y contraseña."
      );

      return;
    }

    try {
      setCargando(true);

      // =====================================================
      // LOGIN REAL CONTRA SPRING BOOT
      // =====================================================

      const respuesta = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            correo: correoNormalizado,
            password: contrasena,
          }),
        }
      );

      let datos = {};

      try {
        datos = await respuesta.json();
      } catch {
        datos = {};
      }

      // =====================================================
      // ERROR DEL BACKEND
      // =====================================================

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje ||
            "No fue posible iniciar sesión."
        );
      }

      // =====================================================
      // VALIDAR RESPUESTA
      // =====================================================

      if (
        !datos.id ||
        !datos.rol ||
        !datos.token
      ) {
        throw new Error(
          "La respuesta del servidor no contiene una sesión válida."
        );
      }

      // =====================================================
      // COMPROBAR ROL SELECCIONADO
      // =====================================================

      const rolEsperadoBackend =
        rolBackendPorFrontend[rol];

      if (rolEsperadoBackend !== datos.rol) {
        const nombreRol =
          rolFrontendPorBackend[datos.rol] ||
          datos.rol;

        setError(
          `Esta cuenta corresponde al rol ${nombreRol}.`
        );

        return;
      }

      // =====================================================
      // CONVERTIR ROL PARA FRONTEND
      // =====================================================

      const rolFrontend =
        rolFrontendPorBackend[datos.rol];

      // =====================================================
      // PERFIL DE COLABORADOR
      // =====================================================
      // Por ahora mantenemos perfilId = 1 para conservar
      // compatibilidad con el frontend actual.
      //
      // Más adelante podremos relacionar el perfil real
      // con el usuario del backend.

      const perfilId =
        datos.rol === "COLABORADOR"
          ? 1
          : null;

      // =====================================================
      // GUARDAR SESIÓN
      // =====================================================

      const sesion = {
        id: datos.id,
        nombre: datos.nombre,
        correo: datos.correo,

        // Rol usado actualmente por el frontend
        rol: rolFrontend,

        // Rol real enviado por Spring Boot
        rolBackend: datos.rol,

        perfilId,

        // JWT
        token: datos.token,
      };

      localStorage.setItem(
        "privelink_sesion",
        JSON.stringify(sesion)
      );

      // Token separado para facilitar llamadas HTTP
      localStorage.setItem(
        "privelink_token",
        datos.token
      );

      // =====================================================
      // COMPATIBILIDAD CON PERFIL.JSX Y NAVBAR.JSX
      // =====================================================

      localStorage.setItem(
        "rol_usuario",
        rolFrontend
      );

      if (
        rolFrontend === "colaborador" &&
        perfilId
      ) {
        localStorage.setItem(
          "perfil_usuario_id",
          String(perfilId)
        );
      } else {
        localStorage.removeItem(
          "perfil_usuario_id"
        );
      }

      // =====================================================
      // REDIRECCIÓN
      // =====================================================

      if (datos.rol === "COLABORADOR") {
        navigate(
          `/perfil/${perfilId}`,
          {
            replace: true,
          }
        );

        return;
      }

      const rutaDestino =
        rutasPorRol[datos.rol];

      if (!rutaDestino) {
        throw new Error(
          "No existe una ruta configurada para este rol."
        );
      }

      navigate(
        rutaDestino,
        {
          replace: true,
        }
      );

    } catch (errorLogin) {
      console.error(
        "Error al iniciar sesión:",
        errorLogin
      );

      setError(
        errorLogin.message ||
          "No fue posible iniciar sesión."
      );

    } finally {
      setCargando(false);
    }
  };

  // =======================================================
  // CERRAR SESIÓN
  // =======================================================

  const cerrarSesion = () => {
    localStorage.removeItem(
      "privelink_sesion"
    );

    localStorage.removeItem(
      "privelink_token"
    );

    localStorage.removeItem(
      "rol_usuario"
    );

    localStorage.removeItem(
      "perfil_usuario_id"
    );

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  };

  return {
    rol,
    setRol,

    correo,
    setCorreo,

    contrasena,
    setContrasena,

    error,

    cargando,

    manejarLogin,

    cerrarSesion,
  };
}