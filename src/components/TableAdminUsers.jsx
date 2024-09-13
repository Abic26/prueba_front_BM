import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { getAllUsers, deleteUser } from "../services/apiService.js";
import DialogEditUser from "./DialogEditUser.jsx";
import DialogCreateUser from "./DialogCreateUser.jsx";

// Encabezados de la tabla
const TABLE_HEAD = ["Usuario del empleado", "Rol del Empleado", "Acciones"];

/**
 * Componente que muestra una tabla con la lista de usuarios.
 * Incluye opciones para crear, editar y eliminar usuarios.
 */
export default function TableAdminUsers() {
  const [rows, setRows] = useState([]); // Estado para las filas de usuarios
  const [loading, setLoading] = useState(true); // Estado para cargar datos
  const [error, setError] = useState(null); // Estado para errores
  const [createModalOpen, setCreateModalOpen] = useState(false); // Estado para el modal de crear
  const [editModalOpen, setEditModalOpen] = useState(false); // Estado para el modal de edición
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Estado para el modal de confirmación de eliminación
  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado
  const [deletingUserId, setDeletingUserId] = useState(null); // Estado para el ID del usuario a eliminar

  // useEffect que se ejecuta una sola vez al montar el componente
  useEffect(() => {
    fetchData(); // Llama a la función para obtener los datos
  }, []); // [] asegura que este useEffect se ejecute solo una vez al montar el componente

  // Maneja la apertura y cierre del modal de creación de usuario
  const handledCreateOpen = () => {
    setCreateModalOpen(!createModalOpen); // Alterna el estado del modal de creación
  };

  // Maneja la apertura y cierre del modal de edición de usuario y selecciona el usuario
  const handleEditOpen = (user = null) => {
    setSelectedUser(user); // Establece el usuario seleccionado si se pasa un usuario
    setEditModalOpen(!editModalOpen); // Alterna el estado del modal de edición
  };

  // Maneja el éxito de la edición y actualiza la lista de usuarios
  const handleSuccess = async () => {
    await fetchData(); // Re-fetch the data
    handleEditOpen(null); // Cierra el modal de edición
  };

  // Función para obtener los datos de los usuarios
  const fetchData = async () => {
    try {
      const data = await getAllUsers();
      setRows(data); // Actualiza el estado con los datos de los usuarios
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  // Maneja la eliminación de un usuario
  const handleDelete = async () => {
    try {
      await deleteUser(deletingUserId);
      await fetchData(); // Actualiza la lista de usuarios
      setDeletingUserId(null); // Limpia el ID del usuario a eliminar
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    } finally {
      setDeleteModalOpen(false); // Cierra el modal de eliminación
    }
  };

  // Abre el modal de confirmación de eliminación
  const openDeleteModal = (id) => {
    setDeletingUserId(id); // Establece el ID del usuario a eliminar
    setDeleteModalOpen(true); // Abre el modal de confirmación de eliminación
  };

  // Maneja el cierre del modal de creación
  const handlerCloseCreate = (boolean) => {
    setCreateModalOpen(boolean);
    window.location.reload(); // Recarga la página para actualizar la lista de usuarios
  };

  // Renderiza el estado de carga o error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-16">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de usuarios
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Información de los empleados
              </Typography>
            </div>
            <div>
              <Button onClick={handledCreateOpen}>Crear Usuario</Button>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-center gap-2 leading-none opacity-70 font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(rows) && rows.length > 0 ? (
                rows.map(({ id, username, role }, index) => {
                  const isLast = index === rows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-center"
                        >
                          {username}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-center"
                        >
                          {role}
                        </Typography>
                      </td>
                      <td className="text-center">
                        <Tooltip content="Editar Usuario">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              handleEditOpen({ id, username, role })
                            }
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Eliminar Usuario">
                          <IconButton
                            variant="text"
                            onClick={() => openDeleteModal(id)} // Establece el ID del usuario a eliminar y abre el modal de eliminación
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={3} className="text-center p-4">
                    No hay usuarios disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Modal para crear un usuario */}
      <Dialog open={createModalOpen} handler={() => setCreateModalOpen(false)}>
        <DialogHeader>Crear Usuario</DialogHeader>
        <DialogBody>
          <DialogCreateUser onClose={handlerCloseCreate} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setCreateModalOpen(false)} // Cierra el modal de creación
            className="mr-1"
          >
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Modal de edición de usuario */}
      <Dialog open={editModalOpen} handler={() => setEditModalOpen(false)}>
        <DialogHeader>Editar Usuario</DialogHeader>
        <DialogBody>
          {selectedUser ? (
            <DialogEditUser user={selectedUser} onSuccess={handleSuccess} />
          ) : (
            <p>No hay usuario seleccionado.</p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setEditModalOpen(false)} // Cierra el modal de edición
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <Dialog open={deleteModalOpen} handler={() => setDeleteModalOpen(false)}>
        <DialogHeader>Confirmación</DialogHeader>
        <DialogBody>
          <Typography>
            ¿Estás seguro de que deseas eliminar el usuario seleccionado?
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue-gray"
            onClick={() => setDeleteModalOpen(false)} // Cierra el modal de eliminación
          >
            <span>Cancelar</span>
          </Button>
          <Button
            variant="text"
            color="red"
            onClick={handleDelete} // Maneja la eliminación del usuario
            className="mr-1"
          >
            <span>Eliminar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
