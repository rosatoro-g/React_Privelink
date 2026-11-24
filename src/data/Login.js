import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

// =========================================================
// RUTAS SEGÚN ROL
// =========================================================

const rutasPorRol = {
  ADMIN: "/inicio-admin",
  CLIENTE: "/feed",
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
// PERFILES LOCALES DE COLABORADORES
// =========================================================

function obtenerPerfilesColaborador() {
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
// HOOK LOGIN
// =========================================================

export function useLogin() {
  const navigate = useNavigate();

  const [rol, setRol] =
    useState("cliente");

  const [correo, setCorreo] =
    useState("");

  const [
    contrasena,
    setContrasena,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [cargando, setCargando] =
    useState(false);

  // =======================================================
  // INICIAR SESIÓN
  // =======================================================

  const manejarLogin = async (
    evento
  ) => {
    evento.preventDefault();

    setError("");

    const correoNormalizado =
      correo.trim().toLowerCase();

    if (
      !correoNormalizado ||
      !contrasena.trim()
    ) {
      setError(
        "Ingresa tu correo y contraseña."
      );

      return;
    }

    try {
      setCargando(true);

      // ===================================================
      // LOGIN REAL CONTRA SPRING BOOT
      // ===================================================

      const respuesta = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            correo:
              correoNormalizado,
            password:
              contrasena,
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

      // ===================================================
      // ERROR DEL BACKEND
      // ===================================================

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje ||
            "Correo o contraseña incorrectos."
        );
      }

      // ===================================================
      // VALIDAR RESPUESTA
      // ===================================================

      if (
        !datos.id ||
        !datos.rol ||
        !datos.token
      ) {
        throw new Error(
          "La respuesta del servidor no contiene una sesión válida."
        );
      }

      // ===================================================
      // VALIDAR ROL SELECCIONADO
      // ===================================================

      const rolEsperadoBackend =
        rolBackendPorFrontend[rol];

      if (
        rolEsperadoBackend !==
        datos.rol
      ) {
        const nombreRol =
          rolFrontendPorBackend[
            datos.rol
          ] || datos.rol;

        setError(
          `Esta cuenta corresponde al rol ${nombreRol}.`
        );

        return;
      }

      const rolFrontend =
        rolFrontendPorBackend[
          datos.rol
        ];

      // ===================================================
      // BUSCAR PERFIL DEL COLABORADOR
      // ===================================================

      let perfilId = null;

      if (
        datos.rol ===
        "COLABORADOR"
      ) {
        const perfiles =
          obtenerPerfilesColaborador();

        const perfilUsuario =
          perfiles.find(
            (perfil) =>
              perfil.usuarioId ===
                datos.id ||
              perfil.correo?.toLowerCase() ===
                datos.correo?.toLowerCase()
          );

        /*
         * Si es un colaborador antiguo
         * que no tiene perfil local,
         * mantenemos perfil 1 como fallback.
         */
        perfilId =
          perfilUsuario?.id || 1;
      }

      // ===================================================
      // GUARDAR SESIÓN
      // ===================================================

      const sesion = {
        id: datos.id,
        nombre: datos.nombre,
        correo: datos.correo,

        rol:
          rolFrontend,

        rolBackend:
          datos.rol,

        perfilId,

        token:
          datos.token,
      };

      localStorage.setItem(
        "privelink_sesion",
        JSON.stringify(sesion)
      );

      localStorage.setItem(
        "privelink_token",
        datos.token
      );

      localStorage.setItem(
        "rol_usuario",
        rolFrontend
      );

      // ===================================================
      // PERFIL DEL COLABORADOR
      // ===================================================

      if (
        rolFrontend ===
          "colaborador" &&
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

      // ===================================================
      // REDIRECCIÓN
      // ===================================================

      if (
        datos.rol ===
        "COLABORADOR"
      ) {
        navigate(
          `/perfil/${perfilId}`,
          {
            replace: true,
          }
        );

        return;
      }

      const rutaDestino =
        rutasPorRol[
          datos.rol
        ];

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