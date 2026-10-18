import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  MemoryRouter,
} from "react-router-dom";

import {
  describe,
  expect,
  test,
  vi,
} from "vitest";

import TarjetaServicio from "../components/TarjetaServicio";

describe("TarjetaServicio", () => {
  test(
    "ejecuta onEliminar al presionar el botón eliminar",
    async () => {
      const user = userEvent.setup();

      const onEliminar = vi.fn();

      const servicio = {
        id: 1,
        perfilId: 1,
        nombre: "Cena y compañía",
        categoria: "Cena",
        descripcion: "Servicio de prueba",
        precio: 40000,
        ubicacion: "Valdivia",
        imagen: "cena",
      };

      render(
        <MemoryRouter>
          <TarjetaServicio
            servicio={servicio}
            puedeEditar={true}
            onEliminar={onEliminar}
          />
        </MemoryRouter>
      );

      const botonEliminar =
        screen.getByRole(
          "button",
          {
            name: "Eliminar",
          }
        );

      await user.click(botonEliminar);

      expect(onEliminar).toHaveBeenCalledTimes(1);

      expect(onEliminar).toHaveBeenCalledWith(
        servicio.id
      );
    }
  );
});