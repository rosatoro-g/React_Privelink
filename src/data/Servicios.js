import servicioEvento from "../assets/img/servicio-evento.jpg";
import servicioCena from "../assets/img/servicio-cena.jpg";
import servicioCine from "../assets/img/servicio-cine.jpg";
import servicioConcierto from "../assets/img/servicio-concierto.jpg";
import servicioBoda from "../assets/img/servicio-boda.jpg";

const STORAGE_KEY = "privelink_servicios";

const imagenes = {
  evento: servicioEvento,
  cena: servicioCena,
  cine: servicioCine,
  concierto: servicioConcierto,
  boda: servicioBoda,
};

const serviciosIniciales = [
  {
    id: 1,
    perfilId: 1,
    nombre: "Acompañamiento a eventos",
    categoria: "Eventos",
    descripcion:
      "Acompañamiento para eventos sociales, celebraciones y ocasiones especiales.",
    precio: 45000,
    ubicacion: "Valdivia",
    imagen: "evento",
  },
  {
    id: 2,
    perfilId: 1,
    nombre: "Cena y compañía",
    categoria: "Cena",
    descripcion:
      "Una experiencia tranquila para compartir una cena y una buena conversación.",
    precio: 40000,
    ubicacion: "Valdivia",
    imagen: "cena",
  },
  {
    id: 3,
    perfilId: 1,
    nombre: "Salida al cine",
    categoria: "Acompañamiento",
    descripcion:
      "Una salida relajada para disfrutar una película y compartir un buen momento.",
    precio: 35000,
    ubicacion: "Valdivia",
    imagen: "cine",
  },
  {
    id: 4,
    perfilId: 2,
    nombre: "Noche de concierto",
    categoria: "Experiencias",
    descripcion:
      "Acompañamiento para conciertos, presentaciones y eventos musicales.",
    precio: 50000,
    ubicacion: "Valdivia",
    imagen: "concierto",
  },
  {
    id: 5,
    perfilId: 2,
    nombre: "Acompañamiento para eventos",
    categoria: "Eventos",
    descripcion:
      "Compañía para eventos sociales y actividades especiales.",
    precio: 40000,
    ubicacion: "Valdivia",
    imagen: "evento",
  },
  {
    id: 6,
    perfilId: 3,
    nombre: "Cena y compañía",
    categoria: "Cena",
    descripcion:
      "Una experiencia para disfrutar gastronomía y buena conversación.",
    precio: 45000,
    ubicacion: "Temuco",
    imagen: "cena",
  },
  {
    id: 7,
    perfilId: 3,
    nombre: "Acompañamiento para bodas",
    categoria: "Eventos",
    descripcion:
      "Acompañamiento para matrimonios, celebraciones y ocasiones especiales.",
    precio: 60000,
    ubicacion: "Temuco",
    imagen: "boda",
  },
];

function inicializarServicios() {
  const guardados = localStorage.getItem(STORAGE_KEY);

  if (!guardados) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(serviciosIniciales)
    );
  }
}

export function obtenerServicios() {
  inicializarServicios();

  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function obtenerServiciosPorPerfil(perfilId) {
  return obtenerServicios().filter(
    (servicio) => servicio.perfilId === Number(perfilId)
  );
}

export function obtenerImagenServicio(nombreImagen) {
  return imagenes[nombreImagen] || servicioEvento;
}

export function crearServicio(nuevoServicio) {
  const servicios = obtenerServicios();

  const servicio = {
    ...nuevoServicio,
    id: Date.now(),
    perfilId: Number(nuevoServicio.perfilId),
    precio: Number(nuevoServicio.precio),
  };

  servicios.push(servicio);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(servicios)
  );

  return servicio;
}

export function actualizarServicio(id, datosActualizados) {
  const servicios = obtenerServicios();

  const actualizados = servicios.map((servicio) =>
    servicio.id === Number(id)
      ? {
          ...servicio,
          ...datosActualizados,
          precio: Number(
            datosActualizados.precio ?? servicio.precio
          ),
        }
      : servicio
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(actualizados)
  );

  return actualizados;
}

export function eliminarServicio(id) {
  const servicios = obtenerServicios();

  const actualizados = servicios.filter(
    (servicio) => servicio.id !== Number(id)
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(actualizados)
  );

  return actualizados;
}

export default serviciosIniciales;