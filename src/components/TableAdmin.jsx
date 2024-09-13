import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
} from "@material-tailwind/react";
import { getAttendanceAll } from '../services/apiService.js';

const TABLE_HEAD = ["Nombre del empleado", "Hora de Llegada", "Fecha de Llegada", "¿Llegó Tarde?"];

// Helper function to determine if arrival is late
const isLate = (timeString) => {
  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  let arrivalHour = hours;
  if (period === "PM" && hours !== 12) {
    arrivalHour += 12;
  } else if (period === "AM" && hours === 12) {
    arrivalHour = 0;
  }

  const arrivalTime = new Date();
  arrivalTime.setHours(arrivalHour, minutes, 0, 0);

  const thresholdTime = new Date();
  thresholdTime.setHours(8, 0, 0, 0);

  return arrivalTime > thresholdTime;
};

export default function TableAdmin() {
  const [rows, setRows] = useState([]); // Inicializa con un array vacío
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttendanceAll();
        setRows(data.attendance); // Asegúrate de que 'data' sea un array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="pt-16">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Reporte de llegadas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Información de las asistencias de los empleados
              </Typography>
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
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 "
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
                rows.map(({ hour, date, User }, index) => {
                  const isLast = index === rows.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={User.username + hour + date}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-center"
                        >
                          {User.username}
                        </Typography>
                      </td>
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
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    No attendance records available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}