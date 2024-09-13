// src/pages/Register.jsx
import React, { useState } from "react";
import { registerUser } from "../services/apiService";
import {
  Button,
  Input,
  Select,
  Option,
  Typography,
  Card,
} from "@material-tailwind/react";

const DialogCreateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "employee",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({ ...prevData, role: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(formData);
    setMessage(response.message);
  };

  return (
    <div className="flex items-center justify-center">
      <Card color="transparent" shadow={false} className="w-full">
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-6 text-center font-semibold opacity-55"
        >
          Crear usuario de registro asistencias
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre de usuario"
            name="username"
            onChange={handleChange}
            className="mb-4"
          />
          <Input
            label="Contraseña"
            name="password"
            onChange={handleChange}
            type="password"
            className="mb-4"
          />
          <Select
            name="role"
            onChange={(value) => handleSelectChange(value)}
            className="mb-4"
            label="Rol"
            value={formData.role}
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
              Registrar
            </Button>
          </div>
          {message && (
            <Typography color="green" className="mt-4 text-center">
              {message}
            </Typography>
          )}
        </form>
      </Card>
    </div>
  );
};

export default DialogCreateUser;
