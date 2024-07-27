"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/appointments-table/data-table";
import { columns } from "@/components/table/appointments-table/columns";
import { Appointment } from "@/types/appwrite.types";
import { getUserAppointments } from "@/lib/action/appointment.actoins";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Spinner from "@/components/spinner";

export default function Page() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams();
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await getUserAppointments(`${userId}`);
        setAppointments(data);
      } catch (error) {
        setError("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [userId]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14 p-1">
      <header className="admin-header">
        <Link href="/">
          <Image
            className="h-8 w-fit"
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={32}
            width={162}
          />
        </Link>
        <p className="text-16-semibold">User Appointments</p>
      </header>
      <section className="w-full space-y-4 ">
        <h1 className="header">Welcome👋</h1>
        <p className="text-dark-700">
          Here, you can easily view and manage all your scheduled appointments
          in one convenient place.
        </p>
      </section>
      <h1 className="text-2xl font-bold mb-4">User Appointments</h1>
      <div className="flex flex-col items-center">
        <Link
          className="text-green-500 ms-auto pb-4"
          href={`/patient/${userId}/new-appointment`}
        >
          Make a new Appointment
        </Link>
        <DataTable columns={columns} data={appointments} />
      </div>
    </div>
  );
}
