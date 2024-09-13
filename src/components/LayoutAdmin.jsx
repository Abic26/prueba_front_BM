import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TableAdminUsers from "./TableAdminUsers.jsx";
import TableAdmin from "./TableAdmin.jsx";
import Logout from "./Logout";

/**
 * Componente que muestra una interfaz de pestañas para administración.
 * Incluye pestañas para el registro de llegada y la administración de usuarios.
 */
export default function TabsDefault() {
  // Datos de las pestañas, cada una con una etiqueta, un valor y un componente asociado
  const data = [
    {
      label: "Registro de llegada",
      value: "admin-records",
      component: <TableAdmin />, // Componente para mostrar el registro de llegada
    },
    {
      label: "Administrar usuarios",
      value: "admin-users",
      component: <TableAdminUsers />, // Componente para administrar usuarios
    },
  ];

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="px-3">
        <Logout /> {/* Componente para cerrar sesión */}
      </div>
      <Tabs value="admin-records"> {/* Pestaña activa por defecto */}
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              <span className="font-bold">{label}</span>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value}>
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
