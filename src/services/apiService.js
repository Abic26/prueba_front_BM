// src/services/apiService.js
const API_URL = "http://localhost:5000/api";

// metodo post para registrar usuario
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// login para el validar usuario
export const loginUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data; // Asegúrate de que `data` contenga `token` y `user`
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: error.message };
  }
};

// metodo para validar token del usuario
export const getUserFromToken = async (token) => {
  // Llama a tu API para obtener los datos del usuario usando el token
  const response = await fetch("/api/verify-token", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to verify token");
  }

  const data = await response.json();
  return data.user; // Asume que el `user` está en la respuesta
};

// get all para visualizar las entradas
export const getAttendanceAll = async () => {
  const response = await fetch(`${API_URL}/attendance/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch attendance data");
  }

  const data = await response.json();

  return data; 
};

// metodo post para crear nueva entrada del empleado
export const createAttendance = async (attendanceData) => {
  try {
    const response = await fetch(`${API_URL}/attendance/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    });

    if (!response.ok) {
      throw new Error("Error al registrar asistencia");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al crear asistencia:", error);
    return { error: error.message };
  }
};

// get por user_id de registro de usuario
export const getAttendanceByUserId = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/attendance/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener registros de asistencia");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener registros de asistencia:", error);
    return { error: error.message };
  }
};

// get all para traer todos los usuarios
export const getAllUsers = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener registros de asistencia");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener registros de asistencia:", error);
    return { error: error.message };
  }
};

// actualizar datos del usuario por id
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error en la actualización del usuario:", error);
    throw error; // Propaga el error para que pueda ser manejado por el componente
  }
};
// Función para eliminar un usuario por ID
export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al eliminar el usuario');
  }

  return await response.json();
};



