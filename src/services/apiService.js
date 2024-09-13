// src/services/apiService.js
const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

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
    return data;
  } catch (error) {
    console.error("Error al crear asistencia:", error);
    return { error: error.message };
  }
};

// apiService.js

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



