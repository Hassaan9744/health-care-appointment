import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/action/appointment.actoins";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/action/patient.action";

const SuccessPage = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_appointment-success", user.name);
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            className="h-20 w-fit"
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={1000}
            height={1000}
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            alt="success message"
            height={300}
            width={280}
          />
        </section>
        <h2 className="header mb-6 max-w-[600px] text-center">
          Your <span className="text-green-500">appointment request</span> has
          been successfully submitted
        </h2>
        <p>We will be in touch shortly to confirm.</p>
        <section className="request-details">
          <p>Requested Appointment Details:</p>
          <div className="flex items-center gap-3">
            <Image
              className="size-7"
              src={doctor?.image!}
              alt={doctor?.name!}
              width={100}
              height={100}
            />
            <p className="whitesapce-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              alt="calender"
              width={24}
              height={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <div className="flex justify-between items-center max-w-[600px] gap-6">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patient/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link className="flex" href={`/patient/${userId}/appointments`}>
              See all Appointments
            </Link>
          </Button>
        </div>

        <p className="copyright">© 2024 CarePulse.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
