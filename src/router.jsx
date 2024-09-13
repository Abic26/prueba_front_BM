import { createBrowserRouter } from "react-router-dom";
import TabsSignUpInComponent from "@/components/TabsSignUpInComponent.jsx";
import TableAdmin from "@/components/TableAdmin.jsx";
import TableEmployee from "@/components/TableEmployee.jsx";
import Error403 from "./components/Error403.jsx";
import ProtectedRoute from "@/ProtectedRoute.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <TabsSignUpInComponent />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <TableAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/employee",
    element: (
      <ProtectedRoute allowedRoles={["employee"]}>
        <TableEmployee />
      </ProtectedRoute>
    ),
  },
  {
    path: "/403",
    element: <Error403 />,
  },
]);

export default routes;
