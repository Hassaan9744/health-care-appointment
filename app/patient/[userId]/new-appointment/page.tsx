import AppointmentForm from "@/components/forms/appointment-form";
import { getPatient } from "@/lib/action/patient.action";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  Sentry.metrics.set("user_view_new-appointment", patient.name);
  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            className="mb-12 h-10 w-fit"
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={1000}
            width={1000}
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
            setOpen={() => {}}
          />

          <p className="copyright mt-10 py-12">© 2024 CarePulse.</p>
        </div>
      </section>
      <Image
        className="side-img max-w-[390px] bg-bottom"
        src="/assets/images/appointment-img.png"
        alt="appointment"
        width={1000}
        height={1000}
      />
    </div>
  );
}
