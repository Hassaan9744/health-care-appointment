// components/appointments-columns.tsx

import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "../../status-badge";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { Appointment } from "@/types/appwrite.types";
import { Doctors } from "@/constants";
import AppointmentModal from "@/components/appointment-model";
export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
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
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">{row.original.reason}</p>
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
