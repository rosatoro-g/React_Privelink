import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TarjetaServicio from "../components/TarjetaServicio";

const servicioPrueba = {
  id: 1,
  perfilId: 1,
  nombre: "Cena y compañía",
  categoria: "Cena",
  descripcion: "Servicio de prueba",
  precio: 40000,
  ubicacion: "Valdivia",
  imagen: "cena",
};

describe("TarjetaServicio", () => {
  test("ejecuta onEliminar al presionar el botón eliminar", async () => {
    const user = userEvent.setup();

    const eliminarMock = vi.fn();

    render(
      <TarjetaServicio
        servicio={servicioPrueba}
        onEliminar={eliminarMock}
      />
    );

    const botonEliminar = screen.getByRole("button", {
      name: "Eliminar",
    });

    await user.click(botonEliminar);

    expect(eliminarMock).toHaveBeenCalledTimes(1);
    expect(eliminarMock).toHaveBeenCalledWith(1);
  });
});