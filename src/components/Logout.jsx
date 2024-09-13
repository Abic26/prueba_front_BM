import React from "react";
import { useAuth } from "../context/AuthContext.jsx"; // Ajusta la ruta según la ubicación de tu archivo
import { Button } from "@material-tailwind/react";

const Logout = () => {
  const { logout } = useAuth();

  // Maneja el clic en el botón de cerrar sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-end">
      <Button
        onClick={handleLogout}
        type="submit"
        color="black"
        className="hover:bg-white hover:text-black"
      >
        Cerrar sesión
      </Button>
    </div>
  );
};

export default Logout;
