import servicioEvento from "../assets/img/servicio-evento.jpg";
import servicioCena from "../assets/img/servicio-cena.jpg";
import servicioCine from "../assets/img/servicio-cine.jpg";
import servicioConcierto from "../assets/img/servicio-concierto.jpg";
import servicioBoda from "../assets/img/servicio-boda.jpg";

const servicios = [
  {
    id: 1,
    perfilId: 1,
    nombre: "Acompañamiento a eventos",
    categoria: "Eventos",
    descripcion:
      "Acompañamiento para eventos sociales, celebraciones y ocasiones especiales.",
    precio: 45000,
    ubicacion: "Valdivia",
    imagen: servicioEvento,
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
    imagen: servicioCena,
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
    imagen: servicioCine,
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
    imagen: servicioConcierto,
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
    imagen: servicioEvento,
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
    imagen: servicioCena,
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
    imagen: servicioBoda,
  },
];

export default servicios;