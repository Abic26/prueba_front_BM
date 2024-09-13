// src/pages/Login.jsx
import React, { useState } from "react";
import { Button, Input, Typography, Card } from "@material-tailwind/react";
import { loginUser, createAttendance } from "../services/apiService";
import { formatDate, formatTime } from '../utils/formatDate'; // Importa funciones para formatear fecha y hora
import { useAuth } from "../context/AuthContext"; // Hook para autenticación
import { useNavigate } from "react-router-dom"; // Hook para navegación

/**
 * Componente de inicio de sesión.
 * Permite a los usuarios iniciar sesión y registrar su asistencia.
 */
const Login = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({ username: "", password: "" });
  // Estado para almacenar mensajes de respuesta
  const [message, setMessage] = useState("");
  // Hook de autenticación y navegación
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Object} e - Evento del formulario.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Maneja el envío del formulario.
   * @param {Object} e - Evento del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData); // Envía los datos del formulario al servicio de inicio de sesión
      if (response.token) {
        login(response.token, response.user); // Guarda el token y los datos del usuario en el contexto
        setMessage(response.message); // Muestra el mensaje de respuesta
        const userRole = response.user.role;
        const userId = response.user.id;
        const currentDate = new Date();
        const formattedDate = formatDate(currentDate);
        const formattedTime = formatTime(currentDate);
        const attendanceData = {
          user_id: userId,
          date: formattedDate,
          hour: formattedTime,
        };
        // Redirige al usuario según su rol
        if (userRole === "employee") {
          navigate("/employee"); // Redirige a la vista del empleado
        } else if (userRole === "admin") {
          navigate("/admin"); // Redirige a la vista del administrador
        }
        // Registra la asistencia
        const attendanceResponse = await createAttendance(
          attendanceData,
          response.token
        );
        if (attendanceResponse.error) {
          console.error("Error al registrar asistencia:", attendanceResponse.error);
        } else {
          // Asistencia registrada exitosamente
        }
      } else {
        setMessage(response.error); // Muestra el error si el inicio de sesión falla
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setMessage('Hubo un error en el inicio de sesión.');
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
            value={formData.username}
            className="mb-4"
          />
          <Input
            label="Contraseña"
            name="password"
            onChange={handleChange}
            type="password"
            value={formData.password}
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
            <Typography color="red" className="mt-4 text-center">
              {message}
            </Typography>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Login;
