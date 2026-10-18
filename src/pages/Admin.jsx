import React, { useState } from "react";
import { Link } from "react-router-dom";

import sofiaImg from "../assets/img/sofia.jpg";
import amandaImg from "../assets/img/amanda.jpg";
import emiliaImg from "../assets/img/emilia.jpg";
import logoPrivelink from "../assets/img/logo privelink.png";

import "../styles/Admin.css";

export default function Admin() {
  const [colaboradores, setColaboradores] = useState([
    {
      id: 1,
      codigo: "PL-001",
      nombre: "Sofía Silva",
      apodo: "@Sofi69",
      foto: sofiaImg,
      telefono: "+56 9 8765 4321",
      comuna: "Valdivia",
      estado: "Activo",
    },
    {
      id: 2,
      codigo: "PL-002",
      nombre: "Amanda Rojas",
      apodo: "@Amanda_xxx",
      foto: amandaImg,
      telefono: "+56 9 1234 5678",
      comuna: "Valdivia",
      estado: "Activo",
    },
    {
      id: 3,
      codigo: "PL-003",
      nombre: "Emilia Rodríguez",
      apodo: "@Emihub",
      foto: emiliaImg,
      telefono: "+56 9 5555 4444",
      comuna: "Temuco",
      estado: "Bloqueado",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const alternarEstado = (id) => {
    setColaboradores((prev) =>
      prev.map((colab) => {
        if (colab.id === id) {
          return {
            ...colab,
            estado:
              colab.estado === "Activo"
                ? "Bloqueado"
                : "Activo",
          };
        }

        return colab;
      })
    );
  };

  const eliminarColaborador = (id) => {
    setColaboradores((prev) =>
      prev.filter((colab) => colab.id !== id)
    );
  };

  const colaboradoresFiltrados = colaboradores.filter(
    (colab) => {
      const termino = busqueda.toLowerCase();

      return (
        colab.nombre.toLowerCase().includes(termino) ||
        colab.apodo.toLowerCase().includes(termino) ||
        colab.codigo.toLowerCase().includes(termino)
      );
    }
  );

  return (
    <div className="contenedor-admin">
      <header className="admin-header">
        <div className="brand-admin">
          <img
            src={logoPrivelink}
            alt="PrivéLink Logo"
            className="logo-admin"
          />

          <span className="badge-rol">
            Panel Administrador
          </span>
        </div>

        <div className="admin-user-info">
          <span className="label-admin">
            Admin:
          </span>

          <strong>Carlos Mendoza</strong>
        </div>
      </header>

      <section className="toolbar-admin">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nombre, apodo o ID..."
            value={busqueda}
            onChange={(evento) =>
              setBusqueda(evento.target.value)
            }
          />
        </div>

        <div className="stats-box">
          <span>
            Total colaboradores:{" "}
            <strong>
              {colaboradoresFiltrados.length}
            </strong>
          </span>
        </div>
      </section>

      <section className="tabla-contenedor">
        <table className="tabla-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Colaborador</th>
              <th>Teléfono / Comuna</th>
              <th>Estado / Permisos</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {colaboradoresFiltrados.map((colab) => (
              <tr key={colab.id}>
                <td>
                  <strong>
                    #{colab.codigo}
                  </strong>
                </td>

                <td>
                  <div className="user-cell">
                    <img
                      src={colab.foto}
                      alt={`Foto de ${colab.nombre}`}
                      className="avatar-tabla"
                    />

                    <div>
                      <p className="user-name">
                        {colab.nombre}
                      </p>

                      <span className="user-apodo">
                        {colab.apodo}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <p>{colab.telefono}</p>

                  <small>
                    {colab.comuna}
                  </small>
                </td>

                <td>
                  <span
                    className={`status-tag ${colab.estado.toLowerCase()}`}
                  >
                    {colab.estado}
                  </span>
                </td>

                <td>
                  <div className="acciones-cell">
                    <Link
                      to={`/perfil/${colab.id}`}
                      className="btn-tabla btn-ver"
                      title="Ver perfil"
                    >
                      Ver perfil
                    </Link>

                    <button
                      type="button"
                      className={`btn-tabla btn-estado ${
                        colab.estado === "Bloqueado"
                          ? "desbloquear"
                          : ""
                      }`}
                      onClick={() =>
                        alternarEstado(colab.id)
                      }
                    >
                      {colab.estado === "Activo"
                        ? "Bloquear"
                        : "Desbloquear"}
                    </button>

                    <button
                      type="button"
                      className="btn-tabla btn-eliminar"
                      onClick={() =>
                        eliminarColaborador(colab.id)
                      }
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}