import React from "react";
import { useAuth } from "../context/AuthContext.jsx"; // Ajusta la ruta según la ubicación de tu archivo
import { Button } from "@material-tailwind/react";

/**
 * Componente de botón para cerrar sesión.
 * Utiliza el contexto de autenticación para manejar el cierre de sesión del usuario.
 */
const Logout = () => {
  const { logout } = useAuth(); // Obtiene la función de cierre de sesión del contexto de autenticación

  /**
   * Maneja el clic en el botón de cerrar sesión.
   * Llama a la función de cierre de sesión proporcionada por el contexto.
   */
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-end">
      <Button
        onClick={handleLogout} // Asocia el manejador de clic al botón
        type="button" // Cambiado a "button" en lugar de "submit" ya que no es un formulario
        color="black"
        className="hover:bg-white hover:text-black"
      >
        Cerrar sesión
      </Button>
    </div>
  );
};

export default Logout;
