import { useState } from "react";
import { useNavigate } from "react-router-dom";

// =========================================================
// CUENTAS DE PRUEBA
// =========================================================
// Estos datos son públicos dentro del frontend.
// Nunca utilizar contraseñas reales aquí.

const cuentasDemo = [
  {
    id: 1,
    correo: "admin@privelink.cl",
    clave: "Admin123",
    rol: "administrador",
  },
  {
    id: 2,
    correo: "colaborador@privelink.cl",
    clave: "Colab123",
    rol: "colaborador",

    // Perfil que pertenece a esta colaboradora
    perfilId: 1,
  },
  {
    id: 3,
    correo: "cliente@gmail.com",
    clave: "Cliente123",
    rol: "cliente",
  },
];

// =========================================================
// RUTAS SEGÚN ROL
// =========================================================

const rutasPorRol = {
  administrador: "/inicio-admin",
  cliente: "/feed",
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

  const manejarLogin = (evento) => {
    evento.preventDefault();

    setError("");

    const correoNormalizado =
      correo.trim().toLowerCase();

    // =====================================================
    // VALIDAR CAMPOS
    // =====================================================

    if (!correoNormalizado || !contrasena) {
      setError(
        "Ingresa tu correo y contraseña."
      );

      return;
    }

    // =====================================================
    // USUARIOS REGISTRADOS
    // =====================================================

    const usuariosGuardados = JSON.parse(
      localStorage.getItem(
        "privelink_usuarios"
      ) || "[]"
    );

    // Cuentas demo + usuarios registrados

    const todasLasCuentas = [
      ...cuentasDemo,
      ...usuariosGuardados,
    ];

    // =====================================================
    // BUSCAR USUARIO
    // =====================================================

    const usuario = todasLasCuentas.find(
      (cuenta) =>
        cuenta.correo?.toLowerCase() ===
          correoNormalizado &&
        cuenta.clave === contrasena
    );

    if (!usuario) {
      setError(
        "Correo o contraseña incorrectos."
      );

      return;
    }

    // =====================================================
    // COMPROBAR ROL SELECCIONADO
    // =====================================================

    if (usuario.rol !== rol) {
      setError(
        "Esta cuenta no corresponde al tipo de usuario seleccionado."
      );

      return;
    }

    // =====================================================
    // PERFIL DE LA COLABORADORA
    // =====================================================

    const perfilId =
      usuario.rol === "colaborador"
        ? usuario.perfilId || 1
        : null;

    // =====================================================
    // GUARDAR SESIÓN
    // =====================================================
    // Nunca guardamos la contraseña.

    const sesion = {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
      perfilId,
    };

    localStorage.setItem(
      "privelink_sesion",
      JSON.stringify(sesion)
    );

    /*
     * Estas claves permiten que Perfil.jsx
     * y Navbar.jsx sepan qué permisos mostrar.
     */

    localStorage.setItem(
      "rol_usuario",
      usuario.rol
    );

    if (
      usuario.rol === "colaborador" &&
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

    if (usuario.rol === "colaborador") {
      navigate(
        `/perfil/${perfilId}`,
        {
          replace: true,
        }
      );

      return;
    }

    navigate(
      rutasPorRol[usuario.rol],
      {
        replace: true,
      }
    );
  };

  // =======================================================
  // CERRAR SESIÓN
  // =======================================================

  const cerrarSesion = () => {
    localStorage.removeItem(
      "privelink_sesion"
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
    manejarLogin,
    cerrarSesion,
  };
}