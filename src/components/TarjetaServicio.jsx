import { Link } from "react-router-dom";

import {
  obtenerImagenServicio,
} from "../data/Servicios";

function TarjetaServicio({
  servicio,
  puedeEditar = false,
  onEliminar,
}) {
  return (
    <article className="card tarjeta-servicio h-100 border-0">

      <div className="servicio-imagen-contenedor">
        <img
          src={obtenerImagenServicio(servicio.imagen)}
          alt={servicio.nombre}
          className="servicio-imagen"
        />

        <div className="servicio-imagen-overlay"></div>

        <span className="servicio-tipo">
          {servicio.categoria}
        </span>
      </div>

      <div className="card-body servicio-contenido d-flex flex-column">

        <h3 className="servicio-nombre">
          {servicio.nombre}
        </h3>

        <p className="servicio-descripcion">
          {servicio.descripcion}
        </p>

        <div className="servicio-meta">

          <div className="servicio-precio">
            <span>
              Precio
            </span>

            <strong>
              $
              {servicio.precio.toLocaleString(
                "es-CL"
              )}
            </strong>
          </div>

          <div className="servicio-ubicacion">
            <span>
              Ubicación
            </span>

            <strong>
              📍 {servicio.ubicacion}
            </strong>
          </div>

        </div>

        {puedeEditar && (
          <div className="servicio-acciones mt-auto">

            <Link
              to={`/editar-servicio/${servicio.id}`}
              className="btn boton-editar-servicio"
            >
              Editar
            </Link>

            {onEliminar && (
              <button
                type="button"
                className="btn boton-eliminar-servicio"
                onClick={() =>
                  onEliminar(servicio.id)
                }
              >
                Eliminar
              </button>
            )}

          </div>
        )}

      </div>
    </article>
  );
}

export default TarjetaServicio;