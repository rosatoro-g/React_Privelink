import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Perfil from "../pages/Perfil";

function renderizarPerfil(ruta = "/perfil/1") {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Perfil", () => {
    test("renderiza correctamente el perfil de Sofía", () => {
    renderizarPerfil("/perfil/1");

    expect(
        screen.getByText("Sofía, 25")
    ).toBeInTheDocument();

    expect(
        screen.getAllByText("📍 Valdivia").length
    ).toBeGreaterThan(0);

    expect(
        screen.getByText("✓ Perfil verificado")
    ).toBeInTheDocument();
    });

  test("muestra los servicios asociados al perfil", () => {
    renderizarPerfil("/perfil/1");

    expect(
      screen.getByText("Acompañamiento a eventos")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Cena y compañía")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Salida al cine")
    ).toBeInTheDocument();
  });

  test("muestra mensaje cuando el perfil no existe", () => {
    renderizarPerfil("/perfil/999");

    expect(
      screen.getByText("Perfil no encontrado")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Volver al feed")
    ).toBeInTheDocument();
  });

  test("elimina un servicio cuando el usuario confirma", async () => {
    const user = userEvent.setup();

    window.confirm = vi.fn(() => true);

    renderizarPerfil("/perfil/1");

    const botonesEliminar =
      screen.getAllByRole("button", {
        name: "Eliminar",
      });

    const cantidadInicial = botonesEliminar.length;

    await user.click(botonesEliminar[0]);

    const botonesRestantes =
      screen.getAllByRole("button", {
        name: "Eliminar",
      });

    expect(botonesRestantes.length).toBe(
      cantidadInicial - 1
    );
  });
});