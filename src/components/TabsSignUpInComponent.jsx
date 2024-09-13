import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

export default function TabsDefault() {
  // Define los datos para las pestañas, cada uno con su etiqueta, valor y componente correspondiente
  const data = [
    {
      label: "Inicio Sesión",
      value: "sign-in",
      component: <Login />, // Componente para la pestaña de inicio de sesión
    },
    {
      label: "Registro",
      value: "sign-up",
      component: <Register />, // Componente para la pestaña de registro
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Componente Tabs para manejar las pestañas */}
      <Tabs value="sign-in"> {/* Valor predeterminado de la pestaña activa */}
        {/* Cabecera de las pestañas */}
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              <span className="font-bold">{label}</span> {/* Etiqueta de cada pestaña */}
            </Tab>
          ))}
        </TabsHeader>
        {/* Cuerpo de las pestañas */}
        <TabsBody>
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value}>
              {component} {/* Componente asociado a cada pestaña */}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
