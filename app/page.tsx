import PatientForm from "@/components/forms/patient-form";
import Image from "next/image";
import Link from "next/link";
import PasskeyModal from "@/components/passkey-modal";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen ">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            className="mb-12 h-10 w-fit"
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            height={1000}
            width={1000}
          />
          <PatientForm />
          <div className="flex text-14-reugular mt-9">
            <p className="copyright">© 2024 CarePulse.</p>
            <Link className="text-green-500 ms-auto" href="/?admin=true">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        className="side-img max-w-[50%]"
        src="/assets/images/onboarding-img.png"
        alt="brand-img"
        width={1000}
        height={1000}
      />
    </div>
  );
}
