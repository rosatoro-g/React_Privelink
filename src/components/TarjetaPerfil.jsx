import { Link } from "react-router-dom";

function TarjetaPerfil({ perfil }) {
  return (
    <article className="tarjeta-perfil">
      <img
        src={perfil.imagen}
        alt={`Foto de ${perfil.nombre}`}
        className="tarjeta-perfil-imagen"
      />

      <div className="tarjeta-perfil-contenido">
        <div className="tarjeta-perfil-badges">
          <span className="disponibilidad-badge">
            {perfil.disponibilidad}
          </span>

          {perfil.verificado && (
            <span className="verificado">
              ✓ Perfil verificado
            </span>
          )}
        </div>

        <h2 className="nombre-perfil">
          {perfil.nombre}, {perfil.edad}
        </h2>

        <p className="ubicacion-perfil">
          📍 {perfil.ubicacion}
        </p>

        <p className="descripcion-perfil">
          {perfil.descripcion}
        </p>

        <p className="servicios-perfil">
          {perfil.servicios.join(" · ")}
        </p>

        <p className="precio">
          Desde ${perfil.precio.toLocaleString("es-CL")}
        </p>

        <Link
          to={`/perfil/${perfil.id}`}
          className="boton-perfil"
        >
          Ver perfil
        </Link>
      </div>
    </article>
  );
}

export default TarjetaPerfil;