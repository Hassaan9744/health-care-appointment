// components/UserAppointments.tsx
import React, { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { columns } from "./appointments-columns"; // Adjust import based on your directory structure
import { fetchAppointments } from "@/lib/fetchAppointments";
import { Appointment } from "@/types/appointments.types";

interface UserAppointmentsProps {
  userId: string;
}

export function UserAppointments({ userId }: UserAppointmentsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments(userId);
        setAppointments(data);
      } catch (error) {
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Appointments</h1>
      <DataTable columns={columns} data={appointments} />
    </div>
  );
}
