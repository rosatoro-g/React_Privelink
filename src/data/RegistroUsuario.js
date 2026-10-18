
import { useState } from "react";

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
  const [datos, setDatos] = useState(datosIniciales);
  const [error, setError] = useState("");
  const [registroCompletado, setRegistroCompletado] =
    useState(false);

  const actualizarCampo = (evento) => {
    const { name, value, type, checked } = evento.target;

    setDatos((anterior) => ({
      ...anterior,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const esMayorDeEdad = (fecha) => {
    if (!fecha) return false;

    const nacimiento = new Date(`${fecha}T00:00:00`);

    if (Number.isNaN(nacimiento.getTime())) {
      return false;
    }

    const hoy = new Date();

    if (nacimiento > hoy) return false;

    let edad =
      hoy.getFullYear() - nacimiento.getFullYear();

    const diferenciaMes =
      hoy.getMonth() - nacimiento.getMonth();

    if (
      diferenciaMes < 0 ||
      (diferenciaMes === 0 &&
        hoy.getDate() < nacimiento.getDate())
    ) {
      edad--;
    }

    return edad >= 18 && edad <= 120;
  };

  // VALIDAR DATOS DE CADA PASO
  const validarPaso = () => {
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

      if (!esMayorDeEdad(datos.fechaNacimiento)) {
        setError(
          "Debes ser mayor de 18 años e ingresar una fecha válida."
        );
        return false;
      }
    }

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

      if (datos.contrasena.length < 8) {
        setError(
          "La contraseña debe tener al menos 8 caracteres."
        );
        return false;
      }

      if (
        datos.contrasena !== datos.confirmarContrasena
      ) {
        setError("Las contraseñas no coinciden.");
        return false;
      }
    }

    setError("");
    return true;
  };

  // SIGUIENTE PASO
  const siguiente = () => {
    if (validarPaso()) {
      setPaso((anterior) => Math.min(anterior + 1, 3));
    }
  };

  // PASO ANTERIOR
  const anterior = () => {
    setError("");
    setPaso((anterior) => Math.max(anterior - 1, 1));
  };

  // COMPLETAR FORMULARIO
 
const completarRegistro = (evento) => {
  evento.preventDefault();

  if (paso !== 3) return;

  if (!datos.aceptaTerminos || !datos.aceptaPrivacidad) {
    setError(
      "Debes aceptar los términos y la política de privacidad."
    );
    return;
  }

  const correoNormalizado = datos.correo.trim().toLowerCase();

  // Consultar usuarios registrados anteriormente
  const usuariosGuardados = JSON.parse(
    localStorage.getItem("privelink_usuarios") || "[]"
  );

  // Comprobar que el correo no esté repetido
  const existeUsuario = usuariosGuardados.some(
    (usuario) => usuario.correo === correoNormalizado
  );

  if (existeUsuario) {
    setError("Este correo electrónico ya está registrado.");
    return;
  }

  // Crear usuario de tipo CLIENTE
  const nuevoUsuario = {
    id: crypto.randomUUID(),
    nombre: datos.nombre.trim(),
    apellido: datos.apellido.trim(),
    fechaNacimiento: datos.fechaNacimiento,
    region: datos.region,
    comuna: datos.comuna.trim(),
    correo: correoNormalizado,
    clave: datos.contrasena,
    rol: "cliente",
  };

  usuariosGuardados.push(nuevoUsuario);

  localStorage.setItem(
    "privelink_usuarios",
    JSON.stringify(usuariosGuardados)
  );

  setError("");
  setRegistroCompletado(true);
};


  return {
    paso,
    datos,
    error,
    registroCompletado,
    actualizarCampo,
    siguiente,
    anterior,
    completarRegistro,
  };
}
