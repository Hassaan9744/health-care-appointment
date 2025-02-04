"use client";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../status-badge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../appointment-model";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// nkwenswvnver23u2309u
// nlve493u49vle == hasan
export type Payment = {
  userId: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  schedule: string;
  patient: {
    $id: string;
    name: string;
    email: string;
  };
  primayPhysicain: string;
  appointment: any;
  reason: string;
  note: string;
  cancellationReason: string | null;
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      // @ts-ignore
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px] ">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primayPhysicain",
    header: () => "doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        // @ts-ignore
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-cener gap-3">
          <Image
            src={`${doctor?.image}`}
            alt={`${doctor?.name}`}
            width={100}
            height={100}
            className="w-fit size-8"
          />
          <p className="whitespace-nowrap text-14">{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actoins",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];
