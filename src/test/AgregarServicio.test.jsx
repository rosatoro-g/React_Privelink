import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AgregarServicio from "../pages/AgregarServicio";

function renderizarFormulario() {
  render(
    <MemoryRouter
      initialEntries={["/agregar-servicio?perfil=1"]}
    >
      <AgregarServicio />
    </MemoryRouter>
  );
}

describe("AgregarServicio", () => {
  test("actualiza el estado al escribir en el nombre del servicio", async () => {
    const user = userEvent.setup();

    renderizarFormulario();

    const inputNombre = screen.getByLabelText(
      "Nombre del servicio"
    );

    await user.type(inputNombre, "Paseo por la ciudad");

    expect(inputNombre).toHaveValue(
      "Paseo por la ciudad"
    );
  });

  test("muestra error si se intenta enviar el formulario vacío", async () => {
    const user = userEvent.setup();

    renderizarFormulario();

    const botonPublicar = screen.getByRole("button", {
      name: "Publicar servicio",
    });

    await user.click(botonPublicar);

    expect(
      screen.getByText(
        "Completa todos los campos obligatorios."
      )
    ).toBeInTheDocument();
  });
});