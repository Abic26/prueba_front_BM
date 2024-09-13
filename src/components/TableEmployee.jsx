import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import Logout from "./Logout";

// Define los encabezados y las filas de la tabla
const TABLE_HEAD = ["Hora de Llegada", "Fecha de Llegada", "¿Llegó Tarde?"];

const isLate = (timeString) => {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  let arrivalHour = hours;
  if (period === "PM" && hours !== 12) {
    arrivalHour += 12;
  } else if (period === "AM" && hours === 12) {
    arrivalHour = 0;
  }

  const hour = new Date();
  hour.setHours(arrivalHour, minutes, 0, 0);

  const thresholdTime = new Date();
  thresholdTime.setHours(8, 0, 0, 0);

  return hour > thresholdTime;
};

export default function SortableTable() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData);
  const userId = user ? user.id : null;

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/attendance/user/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setAttendanceData(data.attendance);
        } else {
          console.error("Error al obtener los datos de asistencia");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAttendanceData();
    }
  }, [userId]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="pt-16 relative">
      <div className=" px-3">
        <Logout />
      </div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Reporte de llegadas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Información de las asistencias del empleado{" "}
                <span className="font-bold text-xl">
                  {user.username || "Desconocido"}
                </span>
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
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
              {attendanceData.map(({ hour, date }, index) => {
                const isLast = index === attendanceData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={hour + date}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {hour}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center"
                      >
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Chip
                        className="text-center"
                        variant="ghost"
                        size="sm"
                        value={isLate(hour) ? "Tarde" : "A tiempo"}
                        color={isLate(hour) ? "red" : "green"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
