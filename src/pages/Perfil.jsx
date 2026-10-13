import { useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import TarjetaServicio from "../components/TarjetaServicio";

import perfiles from "../data/Perfiles";

import {
  obtenerServiciosPorPerfil,
  eliminarServicio,
} from "../data/Servicios";

import "../styles/Perfil.css";

function Perfil() {
  const { id } = useParams();

  const perfil = perfiles.find(
    (perfil) => perfil.id === Number(id)
  );

  const [serviciosPerfil, setServiciosPerfil] =
    useState(() =>
      obtenerServiciosPorPerfil(Number(id))
    );

  function manejarEliminar(servicioId) {
    const confirmar = window.confirm(
      "¿Deseas eliminar este servicio?"
    );

    if (!confirmar) {
      return;
    }

    eliminarServicio(servicioId);

    setServiciosPerfil(
      obtenerServiciosPorPerfil(Number(id))
    );
  }

  if (!perfil) {
    return (
      <>
        <Navbar />

        <main className="perfil-no-encontrado">
          <h2>Perfil no encontrado</h2>

          <Link
            to="/feed"
            className="boton-volver"
          >
            Volver al feed
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="perfil">
        <section className="perfil-cabecera">
          <img
            src={perfil.imagen}
            alt={`Foto de ${perfil.nombre}`}
            className="perfil-foto"
          />

          <div className="perfil-informacion">
            <div className="perfil-titulo">
              <h1>
                {perfil.nombre}, {perfil.edad}
              </h1>

              {perfil.verificado && (
                <span className="perfil-verificado">
                  ✓ Perfil verificado
                </span>
              )}
            </div>

            <p className="perfil-ubicacion">
              📍 {perfil.ubicacion}
            </p>

            <p className="perfil-descripcion">
              {perfil.descripcion}
            </p>

            <p className="perfil-disponibilidad">
              {perfil.disponibilidad}
            </p>

            <div className="perfil-servicios-resumen">
              {perfil.servicios.map(
                (servicio) => (
                  <span key={servicio}>
                    {servicio}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        <section className="perfil-servicios">
          <div className="perfil-servicios-encabezado">
            <div>
              <p className="seccion-etiqueta">
                EXPERIENCIAS
              </p>

              <h2>Mis servicios</h2>
            </div>

            <Link
              to={`/agregar-servicio?perfil=${perfil.id}`}
              className="boton-agregar-servicio"
            >
              + Agregar servicio
            </Link>
          </div>

          {serviciosPerfil.length > 0 ? (
            <div className="servicios-grid">
              {serviciosPerfil.map(
                (servicio) => (
                  <TarjetaServicio
                    key={servicio.id}
                    servicio={servicio}
                    onEliminar={manejarEliminar}
                  />
                )
              )}
            </div>
          ) : (
            <p className="sin-servicios">
              Este perfil todavía no tiene
              servicios publicados.
            </p>
          )}
        </section>
      </main>
    </>
  );
}

export default Perfil;