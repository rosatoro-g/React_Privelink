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

    expect(
      screen.getByRole("heading", {
        name: /Sofía.*25/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Amanda.*27/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /Emilia.*24/i,
      })
    ).toBeInTheDocument();
  });

  test("filtra perfiles por nombre", async () => {
    const user = userEvent.setup();

    renderizarFeed();

    const buscador = screen.getByRole("textbox");

    await user.type(buscador, "Sofía");

    expect(
      screen.getByRole("heading", {
        name: /Sofía.*25/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /Amanda.*27/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /Emilia.*24/i,
      })
    ).not.toBeInTheDocument();
  });

  test("filtra perfiles por ubicación", async () => {
    const user = userEvent.setup();

    renderizarFeed();

    const selectUbicacion = screen.getByDisplayValue(
      "Todas las ubicaciones"
    );

    await user.selectOptions(selectUbicacion, "Temuco");

    expect(
      screen.getByRole("heading", {
        name: /Emilia.*24/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /Sofía.*25/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /Amanda.*27/i,
      })
    ).not.toBeInTheDocument();
  });

  test("no muestra perfiles cuando la búsqueda no tiene resultados", async () => {
    const user = userEvent.setup();

    renderizarFeed();

    const buscador = screen.getByRole("textbox");

    await user.type(buscador, "NoExiste");

    expect(
      screen.queryByRole("heading", {
        name: /Sofía.*25/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /Amanda.*27/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", {
        name: /Emilia.*24/i,
      })
    ).not.toBeInTheDocument();
  });
});