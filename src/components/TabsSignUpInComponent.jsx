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
  const data = [
    {
      label: "Inicio Sesión",
      value: "sign-in",
      component: <Login />,
    },
    {
      label: "Registro",
      value: "sign-up",
      component: <Register />,
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs value="sign-in">
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
