import RegisterForm from "@/components/forms/register-form";
import { getUser } from "@/lib/action/patient.action";
import Image from "next/image";
import React from "react";
import * as Sentry from "@sentry/nextjs";
const Register = async ({ params }: SearchParamProps) => {
  const { userId } = params; // Destructure userID from params
  const user = await getUser(userId);
  Sentry.metrics.set("user_view_register", user.name);
  return (
    <div className="flex h-screen max-h-screen ">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            className="mb-12 h-10 w-fit"
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={1000}
            width={1000}
          />
          {/* Form */}
          <RegisterForm user={user} />
          <p className="copyright py-12">© 2024 CarePulse.</p>
        </div>
      </section>
      <Image
        className="side-img max-w-[390px]"
        src="/assets/images/register-img.png"
        alt="brand-img"
        width={1000}
        height={1000}
      />
    </div>
  );
};

export default Register;
