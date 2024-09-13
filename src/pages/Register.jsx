// src/pages/Register.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/apiService'; // Importa la función para registrar usuarios
import { Button, Input, Select, Option, Typography, Card } from '@material-tailwind/react'; // Importa componentes de Material Tailwind React

/**
 * Componente de registro de usuario.
 * Permite a los usuarios crear una cuenta con nombre de usuario, contraseña y rol.
 */
const Register = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    username: '', // Nombre de usuario
    password: '', // Contraseña
    role: 'employee' // Rol por defecto
  });
  // Estado para almacenar mensajes de respuesta
  const [message, setMessage] = useState('');

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {Object} e - Evento del formulario.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  /**
   * Maneja los cambios en el campo de selección de rol.
   * @param {string} value - Valor seleccionado.
   */
  const handleSelectChange = (value) => {
    setFormData(prevData => ({ ...prevData, role: value }));
  };

  /**
   * Maneja el envío del formulario.
   * @param {Object} e - Evento del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData); // Envía los datos del formulario al servicio de registro
      setMessage(response.message); // Muestra el mensaje de respuesta
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setMessage('Hubo un error al registrar el usuario.');
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-96">
      <Card color="transparent" shadow={false} className="w-96 p-6">
        <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
          Registro
        </Typography>
        <Typography variant="small" color="blue-gray" className="mb-6 text-center font-semibold opacity-55">
          Crear usuario de asistencia
        </Typography>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          <Button type="submit" className="w-full hover:bg-white hover:text-black" color="black">
            Registrar
          </Button>
          {message && <Typography color="green" className="mt-4 text-center">{message}</Typography>}
        </form>
      </Card>
    </div>
  );
};

export default Register;
