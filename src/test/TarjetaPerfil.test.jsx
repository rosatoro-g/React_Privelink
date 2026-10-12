import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TarjetaPerfil from "../components/TarjetaPerfil";

const perfilPrueba = {
  id: 1,
  nombre: "Sofía",
  edad: 25,
  ubicacion: "Valdivia",
  imagen: "sofia.jpg",
  descripcion: "Música, viajes y buenas conversaciones.",
  servicios: ["Acompañamiento", "Eventos", "Cena"],
  precio: 40000,
  disponibilidad: "Disponible hoy",
  verificado: true,
};

function renderizarTarjeta() {
  render(
    <BrowserRouter>
      <TarjetaPerfil perfil={perfilPrueba} />
    </BrowserRouter>
  );
}

describe("TarjetaPerfil", () => {
  test("renderiza correctamente el nombre del perfil", () => {
    renderizarTarjeta();

    expect(
      screen.getByText("Sofía, 25")
    ).toBeInTheDocument();
  });

  test("muestra el perfil como verificado", () => {
    renderizarTarjeta();

    expect(
      screen.getByText("✓ Perfil verificado")
    ).toBeInTheDocument();
  });

  test("muestra el precio formateado correctamente", () => {
    renderizarTarjeta();

    expect(
      screen.getByText("Desde $40.000")
    ).toBeInTheDocument();
  });
});