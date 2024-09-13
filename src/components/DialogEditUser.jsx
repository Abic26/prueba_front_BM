// src/pages/DialogEditUser.jsx
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Select,
  Option,
  Card,
} from "@material-tailwind/react";
import { updateUser } from "../services/apiService.js";

/**
 * Componente para editar un usuario existente.
 * Permite modificar el nombre de usuario, la contraseña y el rol.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Datos del usuario a editar.
 * @param {Function} props.onSuccess - Función a llamar después de actualizar el usuario.
 */
const DialogEditUser = ({ user, onSuccess }) => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "employee",
  });

  // Efecto para inicializar el formulario con los datos del usuario
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "", // Mantén la contraseña vacía para evitar mostrarla
        role: user.role || "employee",
      });
    }
  }, [user]);

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Object} e - Evento del formulario.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Maneja los cambios en el campo de selección de rol.
   * @param {Object} e - Evento de selección.
   */
  const handleSelectChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e,
    }));
  };

  /**
   * Maneja el envío del formulario para actualizar el usuario.
   * @param {Object} e - Evento del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.id, formData); // Envía los datos actualizados al servicio
      console.log("Usuario actualizado:", updatedUser);
      onSuccess(); // Llama a la función onSuccess después de actualizar
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card color="transparent" shadow={false} className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mb-4"
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mb-4"
          />
          <Select
            value={formData.role}
            onChange={handleSelectChange}
            className="mb-4"
            label="Rol"
          >
            <Option value="employee">Empleado</Option>
            <Option value="admin">Administrador</Option>
          </Select>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="hover:bg-white hover:text-black"
              color="black"
            >
              Actualizar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default DialogEditUser;
