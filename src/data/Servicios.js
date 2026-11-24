import servicioEvento from "../assets/img/servicio-evento.jpg";
import servicioCena from "../assets/img/servicio-cena.jpg";
import servicioCine from "../assets/img/servicio-cine.jpg";
import servicioConcierto from "../assets/img/servicio-concierto.jpg";
import servicioBoda from "../assets/img/servicio-boda.jpg";

// =========================================================
// CONFIGURACIÓN API
// =========================================================

const API_URL = "http://localhost:8080/api/servicios";

// =========================================================
// IMÁGENES LOCALES
// =========================================================

const imagenes = {
  evento: servicioEvento,
  cena: servicioCena,
  cine: servicioCine,
  concierto: servicioConcierto,
  boda: servicioBoda,
};

// =========================================================
// OBTENER TOKEN
// =========================================================

function obtenerToken() {
  const token = localStorage.getItem("privelink_token");

  if (token) {
    return token;
  }

  const sesionGuardada =
    localStorage.getItem("privelink_sesion");

  if (!sesionGuardada) {
    return null;
  }

  try {
    const sesion =
      JSON.parse(sesionGuardada);

    return sesion.token || null;
  } catch {
    return null;
  }
}

// =========================================================
// HEADERS AUTORIZADOS
// =========================================================

function obtenerHeaders() {
  const token = obtenerToken();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  return headers;
}

// =========================================================
// MANEJO DE RESPUESTAS
// =========================================================

async function procesarRespuesta(respuesta) {
  if (respuesta.status === 204) {
    return null;
  }

  let datos = null;

  try {
    datos = await respuesta.json();
  } catch {
    datos = null;
  }

  if (!respuesta.ok) {
    if (respuesta.status === 401) {
      throw new Error(
        "Tu sesión expiró o no es válida. Inicia sesión nuevamente."
      );
    }

    if (respuesta.status === 403) {
      throw new Error(
        datos?.mensaje ||
          "No tienes permisos para realizar esta acción."
      );
    }

    if (respuesta.status === 404) {
      throw new Error(
        datos?.mensaje ||
          "El servicio solicitado no existe."
      );
    }

    throw new Error(
      datos?.mensaje ||
        "Ocurrió un error al comunicarse con el servidor."
    );
  }

  return datos;
}

// =========================================================
// OBTENER TODOS LOS SERVICIOS
// =========================================================

export async function obtenerServicios() {
  const respuesta = await fetch(
    API_URL,
    {
      method: "GET",
      headers: obtenerHeaders(),
    }
  );

  const datos =
    await procesarRespuesta(respuesta);

  return Array.isArray(datos)
    ? datos
    : [];
}

// =========================================================
// OBTENER SERVICIOS POR PERFIL
// =========================================================

export async function obtenerServiciosPorPerfil(
  perfilId
) {
  const respuesta = await fetch(
    `${API_URL}?perfilId=${encodeURIComponent(
      String(perfilId)
    )}`,
    {
      method: "GET",
      headers: obtenerHeaders(),
    }
  );

  const datos =
    await procesarRespuesta(respuesta);

  return Array.isArray(datos)
    ? datos
    : [];
}

// =========================================================
// OBTENER SERVICIO POR ID
// =========================================================

export async function obtenerServicioPorId(id) {
  const respuesta = await fetch(
    `${API_URL}/${id}`,
    {
      method: "GET",
      headers: obtenerHeaders(),
    }
  );

  return await procesarRespuesta(
    respuesta
  );
}

// =========================================================
// OBTENER IMAGEN
// =========================================================

export function obtenerImagenServicio(
  nombreImagen
) {
  return (
    imagenes[nombreImagen] ||
    servicioEvento
  );
}

// =========================================================
// CREAR SERVICIO
// =========================================================

export async function crearServicio(
  nuevoServicio
) {
  const servicio = {
    perfilId: String(
      nuevoServicio.perfilId
    ),
    nombre:
      nuevoServicio.nombre.trim(),
    categoria:
      nuevoServicio.categoria,
    descripcion:
      nuevoServicio.descripcion.trim(),
    precio: Number(
      nuevoServicio.precio
    ),
    ubicacion:
      nuevoServicio.ubicacion.trim(),
    imagen:
      nuevoServicio.imagen,
  };

  const respuesta = await fetch(
    API_URL,
    {
      method: "POST",
      headers: obtenerHeaders(),
      body: JSON.stringify(servicio),
    }
  );

  return await procesarRespuesta(
    respuesta
  );
}

// =========================================================
// ACTUALIZAR SERVICIO
// =========================================================

export async function actualizarServicio(
  id,
  datosActualizados
) {
  const servicio = {
    perfilId: String(
      datosActualizados.perfilId
    ),
    nombre:
      datosActualizados.nombre.trim(),
    categoria:
      datosActualizados.categoria,
    descripcion:
      datosActualizados.descripcion.trim(),
    precio: Number(
      datosActualizados.precio
    ),
    ubicacion:
      datosActualizados.ubicacion.trim(),
    imagen:
      datosActualizados.imagen,
  };

  const respuesta = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: obtenerHeaders(),
      body: JSON.stringify(servicio),
    }
  );

  return await procesarRespuesta(
    respuesta
  );
}

// =========================================================
// ELIMINAR SERVICIO
// =========================================================

export async function eliminarServicio(id) {
  const respuesta = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
      headers: obtenerHeaders(),
    }
  );

  return await procesarRespuesta(
    respuesta
  );
}