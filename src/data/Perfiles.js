import sofiaImg from "../assets/img/sofia.jpg";
import amandaImg from "../assets/img/amanda.jpg";
import emiliaImg from "../assets/img/emilia.jpg";

const perfiles = [
  {
    id: 1,
    nombre: "Sofía",
    edad: 25,
    ubicacion: "Valdivia",
    imagen: sofiaImg,
    descripcion: "Música, viajes y buenas conversaciones.",
    servicios: ["Acompañamiento", "Eventos", "Cena"],
    precio: 40000,
    disponibilidad: "Disponible hoy",
    verificado: true,
  },
  {
    id: 2,
    nombre: "Amanda",
    edad: 27,
    ubicacion: "Valdivia",
    imagen: amandaImg,
    descripcion: "Fotografía, eventos y nuevos lugares.",
    servicios: ["Eventos", "Compañía", "Experiencias"],
    precio: 35000,
    disponibilidad: "Disponible esta semana",
    verificado: true,
  },
  {
    id: 3,
    nombre: "Emilia",
    edad: 24,
    ubicacion: "Temuco",
    imagen: emiliaImg,
    descripcion: "Cine, gastronomía y viajes.",
    servicios: ["Cena", "Acompañamiento", "Eventos"],
    precio: 45000,
    disponibilidad: "Disponible hoy",
    verificado: true,
  },
];

export default perfiles;