import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../data/Login.js";

import bannerChicas from "../assets/img/banner1.jpg";
import bannerChica2 from "../assets/img/banner2.jpg";
import bannerChica3 from "../assets/img/banner3.jpg";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [indiceActual, setIndiceActual] = useState(0);

  const {
        rol,
        setRol,
        correo,
        setCorreo,
        contrasena,
        setContrasena,
        error,
        manejarLogin,
      } = useLogin();

  const banners = [
    {
      imagen: bannerChicas,
      titulo: "Conecta con nuevas experiencias",
      texto:
        "Encuentra perfiles y alternativas según tus intereses y preferencias.",
    },
    {
      imagen: bannerChica2,
      titulo: "Encuentra la conexión ideal",
      texto:
        "Explora PrivéLink y descubre experiencias para distintas ocasiones.",
    },
    {
    imagen: bannerChica3,
    titulo:"Haz de cada ocasión una experiencia especial" ,
    texto:
    "Descubre perfiles ideales para acompañarte en cenas, reuniones y momentos que merecen una presencia única"
    },
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceActual((indice) =>
        indice === banners.length - 1 ? 0 : indice + 1
      );
    }, 5000);

    return () => clearInterval(intervalo);
  }, [banners.length]);

  const anterior = () => {
    setIndiceActual((indice) =>
      indice === 0 ? banners.length - 1 : indice - 1
    );
  };

  const siguiente = () => {
    setIndiceActual((indice) =>
      indice === banners.length - 1 ? 0 : indice + 1
    );
  };

  return (
    <main className="login">
      <section className="login-contenedor">
        <div className="login-carrusel">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`login-slide ${
                index === indiceActual ? "login-slide-activo" : ""
              }`}
            >
              <img src={banner.imagen} alt={banner.titulo} />

              <div className="login-overlay"></div>

              <div className="login-slide-texto">
                <p>PRIVÉLINK</p>

                <h2>{banner.titulo}</h2>

                <span>{banner.texto}</span>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="login-carrusel-boton login-anterior"
            onClick={anterior}
            aria-label="Imagen anterior"
          >
            ‹
          </button>

          <button
            type="button"
            className="login-carrusel-boton login-siguiente"
            onClick={siguiente}
            aria-label="Imagen siguiente"
          >
            ›
          </button>

          <div className="login-indicadores">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`login-indicador ${
                  index === indiceActual ? "activo" : ""
                }`}
                onClick={() => setIndiceActual(index)}
                aria-label={`Mostrar imagen ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel-contenido">
            <p className="login-etiqueta">BIENVENIDO A PRIVÉLINK</p>

            <h2>Iniciar sesión</h2>

            <p className="login-subtitulo">
              Selecciona el tipo de cuenta con el que deseas ingresar.
            </p>

            <div className="login-roles">
              <button
                type="button"
                className={rol === "cliente" ? "rol-activo" : ""}
                onClick={() => setRol("cliente")}
              >
                <span>👤</span>
                Cliente
              </button>

              <button
                type="button"
                className={rol === "colaborador" ? "rol-activo" : ""}
                onClick={() => setRol("colaborador")}
              >
                <span>★</span>
                Colaborador
              </button>

              <button
                type="button"
                className={rol === "administrador" ? "rol-activo" : ""}
                onClick={() => setRol("administrador")}
              >
                <span>⚙</span>
                Administrador
              </button>
            </div>

            <form className="login-formulario" onSubmit={manejarLogin}>
              <div className="login-campo">
                <label htmlFor="correo">Correo electrónico</label>

                <input
                  id="correo"
                  type="email"
                  placeholder="correo@ejemplo.cl"
                  value={correo}
                  onChange={(evento) => setCorreo(evento.target.value)}
                />
              </div>

              <div className="login-campo">
                <label htmlFor="contrasena">Contraseña</label>

                <input
                  id="contrasena"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={contrasena}
                  onChange={(evento) => setContrasena(evento.target.value)}
                />
              </div>

              {error && <p className="login-error">{error}</p>}

              <button type="submit" className="login-boton">
                Ingresar
              </button>
            </form>

            <div className="login-separador">
              <span></span>
              <p>o</p>
              <span></span>
            </div>

            <p className="login-registro">
              ¿Quieres formar parte como colaborador?
            </p>

            <button
              type="button"
              className="login-boton-registro"
              onClick={() => navigate("/registro-colaborador")}
            >
              Crear perfil de colaborador
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;