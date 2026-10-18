import {
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";

import Perfil from "../pages/Perfil";

function renderizarPerfil(
  ruta = "/perfil/1"
) {
  return render(
    <MemoryRouter
      initialEntries={[ruta]}
    >
      <Routes>
        <Route
          path="/perfil/:id"
          element={<Perfil />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("Perfil", () => {
  beforeEach(() => {
    localStorage.clear();

    vi.restoreAllMocks();
  });

  test(
    "renderiza correctamente el perfil de Sofía",
    () => {
      renderizarPerfil("/perfil/1");

      expect(
        screen.getByRole(
          "heading",
          {
            name: /Sofía.*25/i,
          }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "✓ Verificado"
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Valdivia"
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "muestra los servicios asociados al perfil",
    () => {
      renderizarPerfil("/perfil/1");

      expect(
        screen.getByRole(
          "heading",
          {
            name: "Acompañamiento a eventos",
          }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole(
          "heading",
          {
            name: "Cena y compañía",
          }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole(
          "heading",
          {
            name: "Salida al cine",
          }
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "muestra mensaje cuando el perfil no existe",
    () => {
      renderizarPerfil(
        "/perfil/999"
      );

      expect(
        screen.getByRole(
          "heading",
          {
            name: "Perfil no encontrado",
          }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole(
          "link",
          {
            name: "Volver a explorar",
          }
        )
      ).toBeInTheDocument();
    }
  );

  test(
    "elimina un servicio cuando la colaboradora propietaria confirma",
    async () => {
      const user = userEvent.setup();

      localStorage.setItem(
        "rol_usuario",
        "colaborador"
      );

      localStorage.setItem(
        "perfil_usuario_id",
        "1"
      );

      const confirmar = vi
        .spyOn(
          window,
          "confirm"
        )
        .mockReturnValue(true);

      renderizarPerfil(
        "/perfil/1"
      );

      const botonesEliminar =
        screen.getAllByRole(
          "button",
          {
            name: "Eliminar",
          }
        );

      const cantidadInicial =
        botonesEliminar.length;

      expect(
        cantidadInicial
      ).toBeGreaterThan(0);

      await user.click(
        botonesEliminar[0]
      );

      expect(
        confirmar
      ).toHaveBeenCalledTimes(1);

      const botonesDespues =
        screen.queryAllByRole(
          "button",
          {
            name: "Eliminar",
          }
        );

      expect(
        botonesDespues
      ).toHaveLength(
        cantidadInicial - 1
      );
    }
  );

  test(
    "el cliente puede ver servicios pero no puede agregar, editar ni eliminar",
    () => {
      localStorage.setItem(
        "rol_usuario",
        "cliente"
      );

      renderizarPerfil(
        "/perfil/1"
      );

      // El cliente sí puede ver el contenido del perfil
      expect(
        screen.getByRole(
          "heading",
          {
            name: "Servicios disponibles",
          }
        )
      ).toBeInTheDocument();

      expect(
        screen.getByRole(
          "heading",
          {
            name: "Acompañamiento a eventos",
          }
        )
      ).toBeInTheDocument();

      // Pero no puede administrar servicios
      expect(
        screen.queryByRole(
          "link",
          {
            name: /Agregar servicio/i,
          }
        )
      ).not.toBeInTheDocument();

      expect(
        screen.queryByRole(
          "link",
          {
            name: "Editar",
          }
        )
      ).not.toBeInTheDocument();

      expect(
        screen.queryByRole(
          "button",
          {
            name: "Eliminar",
          }
        )
      ).not.toBeInTheDocument();
    }
  );
});