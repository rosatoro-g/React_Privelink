import { Link } from "react-router-dom";
import {
  obtenerImagenServicio,
} from "../data/Servicios";

function TarjetaServicio({
  servicio,
  onEliminar,
}) {
  return (
    <article className="servicio-card">
      <img
        src={obtenerImagenServicio(servicio.imagen)}
        alt={servicio.nombre}
        className="servicio-imagen"
      />

      <div className="servicio-contenido">
        <span className="servicio-categoria">
          {servicio.categoria}
        </span>

        <h3>{servicio.nombre}</h3>

        <p className="servicio-descripcion">
          {servicio.descripcion}
        </p>

        <div className="servicio-footer">
          <div>
            <strong>
              $
              {servicio.precio.toLocaleString(
                "es-CL"
              )}
            </strong>

            <span>
              📍 {servicio.ubicacion}
            </span>
          </div>

          <div className="acciones-servicio">
            <Link
              to={`/editar-servicio/${servicio.id}`}
              className="boton-editar-servicio"
            >
              Editar
            </Link>

            {onEliminar && (
              <button
                type="button"
                className="boton-eliminar-servicio"
                onClick={() =>
                  onEliminar(servicio.id)
                }
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default TarjetaServicio;