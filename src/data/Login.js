
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// CUENTAS DE PRUEBA
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
  },
  {
    id: 3,
    correo: "cliente@gmail.com",
    clave: "Cliente123",
    rol: "cliente",
  },
];

const rutasPorRol = {
  administrador: "/inicio-admin",
  colaborador: "/perfil/1",
  cliente: "/feed",
};

export function useLogin() {
  const navigate = useNavigate();

  const [rol, setRol] = useState("cliente");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const manejarLogin = (evento) => {
    evento.preventDefault();
    setError("");

    const correoNormalizado = correo.trim().toLowerCase();

    // Verificar campos
    if (!correoNormalizado || !contrasena) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

   
    
    // Cuentas registradas desde el formulario
    const usuariosGuardados = JSON.parse(
      localStorage.getItem("privelink_usuarios") || "[]"
    );

    // Unir las cuentas de prueba con los clientes registrados
    const todasLasCuentas = [
      ...cuentasDemo,
      ...usuariosGuardados,
    ];

    // Buscar la cuenta y comprobar su contraseña
    const usuario = todasLasCuentas.find(
      (cuenta) =>
        cuenta.correo === correoNormalizado &&
        cuenta.clave === contrasena
    );


    if (!usuario) {
      setError("Correo o contraseña incorrectos.");
      return;
    }


    if (usuario.rol !== rol) {
      setError(
        "Esta cuenta no corresponde al tipo de usuario seleccionado."
      );
      return;
    }

    // Guardar solo datos de sesión, no la contraseña
    const sesion = {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
    };

    localStorage.setItem(
      "privelink_sesion",
      JSON.stringify(sesion)
    );

    // Redirigir según el rol
    navigate(rutasPorRol[usuario.rol], {
      replace: true,
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem("privelink_sesion");
    navigate("/login", { replace: true });
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
