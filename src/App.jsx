import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Perfil from "./pages/Perfil";
import AgregarServicio from "./pages/AgregarServicio";
import Login from "./pages/Login";
import RegistroColaborador from "./pages/RegistroColaborador";
import InicioAdmin from "./pages/InicioAdmin";
import Admin from "./pages/Admin";
import EditarServicio from "./pages/EditarServicio";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/feed" element={<Feed />} />

      <Route
        path="/perfil/:id"
        element={<Perfil />}
      />

      <Route
        path="/agregar-servicio"
        element={<AgregarServicio />}
      />
      
      <Route
        path="/editar-servicio/:id"
        element={<EditarServicio />}
      />
      
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/registro-colaborador"
        element={<RegistroColaborador />}
      />

      <Route
        path="/inicio-admin"
        element={<InicioAdmin />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />
    </Routes>
  );
}

export default App;