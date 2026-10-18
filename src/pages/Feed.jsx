import { useState } from "react";

import perfiles from "../data/Perfiles";

import TarjetaPerfil from "../components/TarjetaPerfil";

import Navbar from "../components/Navbar";

import "../styles/Feed.css";

function Feed() {
  const [busqueda, setBusqueda] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [servicio, setServicio] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState("");
  const [disponibilidad, setDisponibilidad] = useState("");
  const [precioAbierto, setPrecioAbierto] = useState(false);

  const perfilesFiltrados = perfiles.filter((perfil) => {
    const coincideBusqueda =
      perfil.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      perfil.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const coincideUbicacion =
      ubicacion === "" || perfil.ubicacion === ubicacion;

    const coincideServicio =
      servicio === "" || perfil.servicios.includes(servicio);

    let coincidePrecio = true;

    if (rangoPrecio === "hasta-40000") {
      coincidePrecio = perfil.precio <= 40000;
    }

    if (rangoPrecio === "40001-45000") {
      coincidePrecio =
        perfil.precio > 40000 &&
        perfil.precio <= 45000;
    }

    if (rangoPrecio === "45001-60000") {
      coincidePrecio =
        perfil.precio > 45000 &&
        perfil.precio <= 60000;
    }

    if (rangoPrecio === "mas-60000") {
      coincidePrecio = perfil.precio > 60000;
    }

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

  const limpiarFiltros = () => {
    setBusqueda("");
    setUbicacion("");
    setServicio("");
    setRangoPrecio("");
    setDisponibilidad("");
    setPrecioAbierto(false);
  };

  const seleccionarPrecio = (valor) => {
    setRangoPrecio(valor);
    setPrecioAbierto(false);
  };

  const obtenerTextoPrecio = () => {
    switch (rangoPrecio) {
      case "hasta-40000":
        return "Hasta $40.000";

      case "40001-45000":
        return "$40.001 a $45.000";

      case "45001-60000":
        return "$45.001 a $60.000";

      case "mas-60000":
        return "Más de $60.000";

      default:
        return "Todos los precios";
    }
  };

  return (
    <>
      <Navbar />

      <main className="feed">
        <div className="feed-luz feed-luz-uno"></div>
        <div className="feed-luz feed-luz-dos"></div>
        <div className="feed-luz feed-luz-tres"></div>

        <section className="feed-hero container">
          <div className="feed-hero-contenido">
            <span className="feed-eyebrow">
              EXPERIENCIAS PRIVÉLINK
            </span>

            <h1>
              Encuentra la conexión ideal para cada ocasión
            </h1>

            <p>
              Explora perfiles cuidadosamente presentados y encuentra
              experiencias según ubicación, disponibilidad, intereses
              y presupuesto.
            </p>

            <div className="feed-hero-detalles d-flex flex-wrap justify-content-center gap-3">
              <span>Perfiles verificados</span>
              <span>Experiencias personalizadas</span>
              <span>Privacidad y discreción</span>
            </div>
          </div>
        </section>

        <section className="container feed-contenido">
          <div className="feed-filtros card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                <div>
                  <span className="feed-seccion-etiqueta">
                    FILTRA TU EXPERIENCIA
                  </span>

                  <h2 className="feed-filtros-titulo">
                    Encuentra lo que buscas
                  </h2>
                </div>

                <button
                  type="button"
                  className="btn btn-sm boton-limpiar"
                  onClick={limpiarFiltros}
                >
                  Limpiar filtros
                </button>
              </div>

              <div className="row g-3">
                {/* BUSCADOR */}
                <div className="col-12">
                  <label
                    htmlFor="busqueda"
                    className="form-label feed-label"
                  >
                    Buscar
                  </label>

                  <input
                    id="busqueda"
                    type="text"
                    className="form-control feed-control"
                    placeholder="Nombre, interés o descripción..."
                    value={busqueda}
                    onChange={(evento) =>
                      setBusqueda(evento.target.value)
                    }
                  />
                </div>

                {/* UBICACIÓN */}
                <div className="col-12 col-md-6 col-xl">
                  <label
                    htmlFor="ubicacion"
                    className="form-label feed-label"
                  >
                    Ubicación
                  </label>

                  <select
                    id="ubicacion"
                    className="form-select feed-control"
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
                </div>

                {/* SERVICIO */}
                <div className="col-12 col-md-6 col-xl">
                  <label
                    htmlFor="servicio"
                    className="form-label feed-label"
                  >
                    Servicio
                  </label>

                  <select
                    id="servicio"
                    className="form-select feed-control"
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
                </div>

                {/* DISPONIBILIDAD */}
                <div className="col-12 col-md-6 col-xl">
                  <label
                    htmlFor="disponibilidad"
                    className="form-label feed-label"
                  >
                    Disponibilidad
                  </label>

                  <select
                    id="disponibilidad"
                    className="form-select feed-control"
                    value={disponibilidad}
                    onChange={(evento) =>
                      setDisponibilidad(evento.target.value)
                    }
                  >
                    <option value="">
                      Toda disponibilidad
                    </option>

                    <option value="Disponible hoy">
                      Disponible hoy
                    </option>

                    <option value="Disponible esta semana">
                      Disponible esta semana
                    </option>

                  </select>
                </div>

                {/* PRECIO */}
                <div className="col-12 col-md-6 col-xl">
                  <span className="form-label feed-label">
                    Precio
                  </span>

                  <div className="precio-dropdown">
                    <button
                      type="button"
                      className={`precio-dropdown-boton ${
                        precioAbierto
                          ? "precio-dropdown-boton-abierto"
                          : ""
                      }`}
                      onClick={() =>
                        setPrecioAbierto(!precioAbierto)
                      }
                      aria-expanded={precioAbierto}
                    >
                      <span>{obtenerTextoPrecio()}</span>

                      <span
                        className={`precio-dropdown-flecha ${
                          precioAbierto
                            ? "precio-dropdown-flecha-abierta"
                            : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    {precioAbierto && (
                      <div className="precio-dropdown-menu">
                        <label className="precio-radio">
                          <input
                            type="radio"
                            name="rango-precio"
                            value=""
                            checked={rangoPrecio === ""}
                            onChange={() =>
                              seleccionarPrecio("")
                            }
                          />

                          <span>Todos los precios</span>
                        </label>

                        <label className="precio-radio">
                          <input
                            type="radio"
                            name="rango-precio"
                            value="hasta-40000"
                            checked={
                              rangoPrecio === "hasta-40000"
                            }
                            onChange={() =>
                              seleccionarPrecio(
                                "hasta-40000"
                              )
                            }
                          />

                          <span>Hasta $40.000</span>
                        </label>

                        <label className="precio-radio">
                          <input
                            type="radio"
                            name="rango-precio"
                            value="40001-45000"
                            checked={
                              rangoPrecio === "40001-45000"
                            }
                            onChange={() =>
                              seleccionarPrecio(
                                "40001-45000"
                              )
                            }
                          />

                          <span>$40.001 a $45.000</span>
                        </label>

                        <label className="precio-radio">
                          <input
                            type="radio"
                            name="rango-precio"
                            value="45001-60000"
                            checked={
                              rangoPrecio === "45001-60000"
                            }
                            onChange={() =>
                              seleccionarPrecio(
                                "45001-60000"
                              )
                            }
                          />

                          <span>$45.001 a $60.000</span>
                        </label>

                        <label className="precio-radio">
                          <input
                            type="radio"
                            name="rango-precio"
                            value="mas-60000"
                            checked={
                              rangoPrecio === "mas-60000"
                            }
                            onChange={() =>
                              seleccionarPrecio(
                                "mas-60000"
                              )
                            }
                          />

                          <span>Más de $60.000</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="feed-perfiles">
            <div className="feed-perfiles-encabezado d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3">
              <div>
                <span className="feed-seccion-etiqueta">
                  DESCUBRE
                </span>

                <h2>Perfiles disponibles</h2>

                <p>
                  {perfilesFiltrados.length}{" "}
                  {perfilesFiltrados.length === 1
                    ? "perfil encontrado"
                    : "perfiles encontrados"}
                </p>
              </div>
            </div>

            {perfilesFiltrados.length > 0 ? (
              <div className="row g-4">
                {perfilesFiltrados.map((perfil) => (
                  <div
                    key={perfil.id}
                    className="col-12 col-md-6 col-lg-4"
                  >
                    <TarjetaPerfil perfil={perfil} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="sin-resultados card border-0 shadow-sm">
                <div className="card-body p-5 text-center">
                  <span className="sin-resultados-icono">
                    ✦
                  </span>

                  <h3>
                    No encontramos coincidencias
                  </h3>

                  <p>
                    Prueba modificando alguno de los filtros
                    seleccionados.
                  </p>

                  <button
                    type="button"
                    className="btn boton-limpiar-vacio"
                    onClick={limpiarFiltros}
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>
            )}
          </section>
        </section>
      </main>
    </>
  );
}

export default Feed;