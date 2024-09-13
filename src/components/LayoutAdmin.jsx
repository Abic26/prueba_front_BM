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

export default function TabsDefault() {
  const data = [
    {
      label: "Registro de llegada",
      value: "admin-records",
      component: <TableAdmin />,
    },
    {
      label: "Administrar usuarios",
      value: "admin-users",
      component: <TableAdminUsers />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className=" px-3">
        <Logout />
      </div>
      <Tabs value="admin-records">
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
