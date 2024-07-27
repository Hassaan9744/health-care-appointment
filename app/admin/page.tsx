"use client";
import StatCard from "@/components/stat-card";
import { getRecentAppointments } from "@/lib/action/appointment.actoins";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../components/table/data-table";
import { columns } from "@/components/table/columns";
import Spinner from "@/components/spinner";
import { any } from "zod";

const Admin = () => {
  const [appointments, setAppointments] = useState();
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const appointmentsData = await getRecentAppointments();
    setAppointments(appointmentsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
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
        <p className="text-16-semibold"> Admin Dashboard</p>
      </header>
      <section className="w-full space-y-4 ">
        <h1 className="header">Welcome👋</h1>
        <p className="text-dark-700">
          Start the day wth managing new appointments
        </p>
      </section>
      <section className="admin-stat">
        <StatCard
          type="appointment"
          count={appointments.scheduledCount}
          label="Scheduled Appointments"
          icon="/assets/icons/appointments.svg"
        />
        <StatCard
          type="pending"
          count={appointments.pendingCount}
          label="Pending Appointments"
          icon="/assets/icons/pending.svg"
        />
        <StatCard
          type="cancelled"
          count={appointments.cancelledCount}
          label="Cancelled Appointments"
          icon="/assets/icons/cancelled.svg"
        />
      </section>
      <DataTable columns={columns} data={appointments.documents} />
    </div>
  );
};

export default Admin;
