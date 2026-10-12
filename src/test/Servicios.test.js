import {
  beforeEach,
  describe,
  expect,
  test,
} from "vitest";

import {
  obtenerServicios,
  obtenerServiciosPorPerfil,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from "../data/Servicios";

describe("Servicios - CRUD", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("obtiene la lista inicial de servicios", () => {
    const servicios = obtenerServicios();

    expect(servicios.length).toBeGreaterThan(0);
  });

  test("obtiene servicios correspondientes a un perfil", () => {
    const serviciosSofia =
      obtenerServiciosPorPerfil(1);

    expect(
      serviciosSofia.every(
        (servicio) => servicio.perfilId === 1
      )
    ).toBe(true);
  });

  test("crea un nuevo servicio", () => {
    const nuevoServicio = crearServicio({
      perfilId: 1,
      nombre: "Paseo por Valdivia",
      categoria: "Experiencias",
      descripcion: "Servicio creado para testing",
      precio: 38000,
      ubicacion: "Valdivia",
      imagen: "evento",
    });

    expect(nuevoServicio.nombre).toBe(
      "Paseo por Valdivia"
    );

    expect(nuevoServicio.precio).toBe(38000);

    const servicios = obtenerServicios();

    expect(
      servicios.some(
        (servicio) =>
          servicio.id === nuevoServicio.id
      )
    ).toBe(true);
  });

  test("actualiza un servicio existente", () => {
    const servicio = crearServicio({
      perfilId: 1,
      nombre: "Servicio original",
      categoria: "Eventos",
      descripcion: "Descripción original",
      precio: 30000,
      ubicacion: "Valdivia",
      imagen: "evento",
    });

    actualizarServicio(servicio.id, {
      nombre: "Servicio actualizado",
      precio: 50000,
    });

    const servicios = obtenerServicios();

    const actualizado = servicios.find(
      (item) => item.id === servicio.id
    );

    expect(actualizado.nombre).toBe(
      "Servicio actualizado"
    );

    expect(actualizado.precio).toBe(50000);
  });

  test("elimina un servicio existente", () => {
    const servicio = crearServicio({
      perfilId: 1,
      nombre: "Servicio para eliminar",
      categoria: "Cena",
      descripcion: "Servicio temporal",
      precio: 25000,
      ubicacion: "Valdivia",
      imagen: "cena",
    });

    eliminarServicio(servicio.id);

    const servicios = obtenerServicios();

    expect(
      servicios.find(
        (item) => item.id === servicio.id
      )
    ).toBeUndefined();
  });
});