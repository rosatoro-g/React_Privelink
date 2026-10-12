import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Feed from "../pages/Feed";

function renderizarFeed() {
  render(
    <BrowserRouter>
      <Feed />
    </BrowserRouter>
  );
}

describe("Feed", () => {
  test("renderiza los tres perfiles disponibles", () => {
    renderizarFeed();

    expect(screen.getByText("Sofía, 25")).toBeInTheDocument();
    expect(screen.getByText("Amanda, 27")).toBeInTheDocument();
    expect(screen.getByText("Emilia, 24")).toBeInTheDocument();
  });

  test("filtra perfiles por nombre", async () => {
    const user = userEvent.setup();

    renderizarFeed();

    const buscador = screen.getByPlaceholderText(
      "Buscar por nombre o interés..."
    );

    await user.type(buscador, "Sofía");

    expect(screen.getByText("Sofía, 25")).toBeInTheDocument();
    expect(screen.queryByText("Amanda, 27")).not.toBeInTheDocument();
    expect(screen.queryByText("Emilia, 24")).not.toBeInTheDocument();
  });

  test("filtra perfiles por ubicación", async () => {
    const user = userEvent.setup();

    renderizarFeed();

    const selectUbicacion = screen.getByDisplayValue(
      "Todas las ubicaciones"
    );

    await user.selectOptions(selectUbicacion, "Temuco");

    expect(screen.getByText("Emilia, 24")).toBeInTheDocument();
    expect(screen.queryByText("Sofía, 25")).not.toBeInTheDocument();
    expect(screen.queryByText("Amanda, 27")).not.toBeInTheDocument();
  });

  test("muestra mensaje cuando no hay resultados", async () => {
    const user = userEvent.setup();

    renderizarFeed();

    const buscador = screen.getByPlaceholderText(
      "Buscar por nombre o interés..."
    );

    await user.type(buscador, "NoExiste");

    expect(
      screen.getByText(
        "No se encontraron perfiles con esos filtros."
      )
    ).toBeInTheDocument();
  });
});