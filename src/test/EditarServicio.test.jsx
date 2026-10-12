import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import EditarServicio from "../pages/EditarServicio";

function renderizarEditar(ruta = "/editar-servicio/1") {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route
          path="/editar-servicio/:id"
          element={<EditarServicio />}
        />

        <Route
          path="/perfil/:id"
          element={<p>Perfil destino</p>}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("EditarServicio", () => {
  test("carga los datos actuales del servicio", () => {
    renderizarEditar();

    expect(
      screen.getByDisplayValue("Acompañamiento a eventos")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Eventos")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("45000")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Valdivia")
    ).toBeInTheDocument();
  });

  test("actualiza el estado al modificar el nombre", async () => {
    const user = userEvent.setup();

    renderizarEditar();

    const inputNombre = screen.getByLabelText(
      "Nombre del servicio"
    );

    await user.clear(inputNombre);

    await user.type(
      inputNombre,
      "Servicio actualizado"
    );

    expect(inputNombre).toHaveValue(
      "Servicio actualizado"
    );
  });

  test("muestra error cuando faltan campos obligatorios", async () => {
    const user = userEvent.setup();

    renderizarEditar();

    const inputNombre = screen.getByLabelText(
      "Nombre del servicio"
    );

    await user.clear(inputNombre);

    const botonGuardar = screen.getByRole("button", {
      name: "Guardar cambios",
    });

    await user.click(botonGuardar);

    expect(
      screen.getByText(
        "Completa todos los campos obligatorios."
      )
    ).toBeInTheDocument();
  });

  test("guarda los cambios y navega al perfil", async () => {
    const user = userEvent.setup();

    renderizarEditar();

    const inputNombre = screen.getByLabelText(
      "Nombre del servicio"
    );

    await user.clear(inputNombre);

    await user.type(
      inputNombre,
      "Evento actualizado"
    );

    const botonGuardar = screen.getByRole("button", {
      name: "Guardar cambios",
    });

    await user.click(botonGuardar);

    expect(
      await screen.findByText("Perfil destino")
    ).toBeInTheDocument();
  });
});