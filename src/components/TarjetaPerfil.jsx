import { Link } from "react-router-dom";

function TarjetaPerfil({ perfil }) {
  return (
    <article className="card tarjeta-perfil h-100 border-0">
      <div className="tarjeta-imagen-contenedor">
        <img
          src={perfil.imagen}
          alt={`Foto de ${perfil.nombre}`}
          className="card-img-top tarjeta-perfil-imagen"
        />

        <div className="tarjeta-imagen-overlay"></div>

        <div className="tarjeta-perfil-badges">
          <span className="badge disponibilidad-badge">
            {perfil.disponibilidad}
          </span>

          {perfil.verificado && (
            <span className="badge verificado">
              ✓ Verificado
            </span>
          )}
        </div>

        <div className="tarjeta-nombre-overlay">
          <h2>
            {perfil.nombre}
            <span>, {perfil.edad}</span>
          </h2>

          <p>📍 {perfil.ubicacion}</p>
        </div>
      </div>

      <div className="card-body tarjeta-perfil-contenido d-flex flex-column">
        <p className="descripcion-perfil">
          {perfil.descripcion}
        </p>

        <div className="servicios-perfil">
          {perfil.servicios.map((servicio) => (
            <span
              key={servicio}
              className="servicio-chip"
            >
              {servicio}
            </span>
          ))}
        </div>

        <div className="tarjeta-footer mt-auto">
          <div className="precio-contenedor">
            <span className="precio-etiqueta">
              Desde
            </span>

            <p className="precio">
              ${perfil.precio.toLocaleString("es-CL")}
            </p>
          </div>

          <Link
            to={`/perfil/${perfil.id}`}
            className="btn boton-perfil"
          >
            Ver perfil
            <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default TarjetaPerfil;