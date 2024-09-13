// src/pages/Login.jsx
import React, { useState } from "react";
import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { loginUser, createAttendance } from "../services/apiService";
import { formatDate, formatTime } from '../utils/formatDate'; // Importa las funciones de formato
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(formData);
    if (response.token) {
      login(response.token, response.user); // Asegúrate de pasar el objeto del usuario
      setMessage(response.message);
      const userRole = response.user.role; // Asegúrate de que esta propiedad exista
      const userId = response.user.id;
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      const formattedTime = formatTime(currentDate);
      const attendanceData = {
        user_id: userId,
        date: formattedDate,
        hour: formattedTime,
      };
      if (userRole === "employee") {
        // console.log("Redirecting to /employee");
        navigate("/employee"); // Redirige al componente TableEmployee
      } else if (userRole === "admin") {
        // console.log("Redirecting to /admin");
        navigate("/admin"); // Redirige al componente TableAdmin
      }
      console.log(attendanceData,
        response.token);
      const attendanceResponse = await createAttendance(
        attendanceData,
        response.token
      );

      if (attendanceResponse.error) {
        console.error(
          "Error al registrar asistencia:",
          attendanceResponse.error
        );
      } else {
        // console.log("Asistencia registrada:", attendanceResponse);
      }
    } else {
      setMessage(response.error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-96">
      <Card color="transparent" shadow={false} className="w-96 p-6">
        <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
          Inicio de Sesión
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mb-6 text-center font-semibold opacity-55"
        >
          Control de asistencia
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
          <Button
            type="submit"
            color="black"
            className="w-full hover:bg-white hover:text-black"
          >
            Iniciar Sesión
          </Button>
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

export default Login;
