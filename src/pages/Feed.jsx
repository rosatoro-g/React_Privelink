import { useState } from "react";

import perfiles from "../data/Perfiles";
import TarjetaPerfil from "../components/TarjetaPerfil";
import Navbar from "../components/Navbar";

import "../styles/Feed.css";

function Feed() {
  const [busqueda, setBusqueda] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [servicio, setServicio] = useState("");
  const [precioMaximo, setPrecioMaximo] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");

  const perfilesFiltrados = perfiles.filter((perfil) => {
    const coincideBusqueda =
      perfil.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      perfil.descripcion
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    const coincideUbicacion =
      ubicacion === "" ||
      perfil.ubicacion === ubicacion;

    const coincideServicio =
      servicio === "" ||
      perfil.servicios.includes(servicio);

    const coincidePrecio =
      precioMaximo === "" ||
      perfil.precio <= Number(precioMaximo);

    const coincideDisponibilidad =
      disponibilidad === "" ||
      perfil.disponibilidad === disponibilidad;

    return (
      coincideBusqueda &&
      coincideUbicacion &&
      coincideServicio &&
      coincidePrecio &&
      coincideDisponibilidad
    );
  });

  return (
    <>
      <Navbar />

      <main className="feed">
        <section className="feed-hero">
          <h1>
            Encuentra la compañía ideal para cada ocasión
          </h1>

          <p>
            Explora perfiles y encuentra experiencias que se
            adapten a lo que buscas.
          </p>
        </section>

        <section className="feed-filtros">
          <input
            type="text"
            placeholder="Buscar por nombre o interés..."
            value={busqueda}
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
          />

          <select
            value={ubicacion}
            onChange={(evento) =>
              setUbicacion(evento.target.value)
            }
          >
            <option value="">
              Todas las ubicaciones
            </option>

            <option value="Valdivia">
              Valdivia
            </option>

            <option value="Temuco">
              Temuco
            </option>
          </select>

          <select
            value={servicio}
            onChange={(evento) =>
              setServicio(evento.target.value)
            }
          >
            <option value="">
              Todos los servicios
            </option>

            <option value="Acompañamiento">
              Acompañamiento
            </option>

            <option value="Eventos">
              Eventos
            </option>

            <option value="Cena">
              Cena
            </option>

            <option value="Compañía">
              Compañía
            </option>

            <option value="Experiencias">
              Experiencias
            </option>
          </select>

          <select
            value={precioMaximo}
            onChange={(evento) =>
              setPrecioMaximo(evento.target.value)
            }
          >
            <option value="">
              Cualquier precio
            </option>

            <option value="35000">
              Hasta $35.000
            </option>

            <option value="40000">
              Hasta $40.000
            </option>

            <option value="45000">
              Hasta $45.000
            </option>
          </select>

          <select
            value={disponibilidad}
            onChange={(evento) =>
              setDisponibilidad(evento.target.value)
            }
          >
            <option value="">
              Cualquier disponibilidad
            </option>

            <option value="Disponible hoy">
              Disponible hoy
            </option>

            <option value="Disponible esta semana">
              Disponible esta semana
            </option>
          </select>
        </section>

        <section className="feed-perfiles">
          <h2>Perfiles disponibles</h2>

          {perfilesFiltrados.length > 0 ? (
            <div className="contenedor-perfiles">
              {perfilesFiltrados.map((perfil) => (
                <TarjetaPerfil
                  key={perfil.id}
                  perfil={perfil}
                />
              ))}
            </div>
          ) : (
            <p className="sin-resultados">
              No se encontraron perfiles con esos filtros.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default Feed;