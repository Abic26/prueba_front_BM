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

const DialogEditUser = ({ user, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "employee",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "", // Mantén la contraseña vacía para evitar mostrarla
        role: user.role || "employee",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejador específico para Select
  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.id, formData);
      console.log("Usuario actualizado:", updatedUser);
      onSuccess(); // Llama a la función onSuccess después de actualizar
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card color="transparent" shadow={false} className="w-full">
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
            onChange={(e) => handleSelectChange(e)}
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
