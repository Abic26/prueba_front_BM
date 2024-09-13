import { createBrowserRouter } from "react-router-dom";
import TabsSignUpInComponent from "@/components/TabsSignUpInComponent.jsx";
import LayoutAdmin from "@/components/LayoutAdmin.jsx";
import TableEmployee from "@/components/TableEmployee.jsx";
import Error403 from "./components/Error403.jsx";
import ProtectedRoute from "@/ProtectedRoute.jsx";

const routes = createBrowserRouter([
  // ruta para el login y el registrar
  {
    path: "/",
    element: <TabsSignUpInComponent />,
  },
  // ruta para cuando se loguea en rol admin
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
  },
  // ruta para cuando se loguea en rol empleado

  {
    path: "/employee",
    element: (
      <ProtectedRoute allowedRoles={["employee"]}>
        <TableEmployee />
      </ProtectedRoute>
    ),
  },
  // ruta para cuando se loguea y tambia la ruta

  {
    path: "/403",
    element: <Error403 />,
  },
]);

export default routes;
