"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { encryptKey } from "@/lib/utils";
import { toast } from "./ui/use-toast";

const passkeyModal = () => {
  const [open, setOpen] = useState(false);
  const [passKey, setPassKey] = useState("");
  const [error, setError] = useState("");
  const path = usePathname();
  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accesskey")
      : null;
  const router = useRouter();

  useEffect(() => {
    if (path) {
      if (passKey === process.env.ADMIN_PASSKEY) {
        setOpen(false);
        toast({
          title: "Admin Login Successful",
          variant: "default",
        });
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptKey]);
  const validatePassKey = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encyptedPassKey = encryptKey(passKey);
      localStorage.setItem("accesskey", encyptedPassKey);
      setOpen(false);
      toast({
        title: "Admin Login Successful",
      });
      router.push("/admin");
    } else {
      setError("Invalid Passkey");
      toast({
        title: "Wrong Passkey",
        variant: "destructive",
      });
    }
  };

  const closeMdal = () => {
    setOpen(false);
    router.push("/");
  };
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start justify-between">
              Admin Access Verfication
              <Image
                src="/assets/icons/close.svg"
                alt="close"
                width={24}
                height={24}
                onClick={() => closeMdal()}
                className="cursor-pointer"
              />
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access the admin page, please enter the passkey.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <InputOTP
              maxLength={6}
              value={passKey}
              onChange={(value) => setPassKey(value)}
            >
              <InputOTPGroup className="shad-otp">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>
            {error && (
              <p className="shad-error text-14-regular mt-4 flex justify-center">
                {error}
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogAction
              className="shad-primary-btn w-full"
              onClick={(e) => validatePassKey(e)}
            >
              Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default passkeyModal;
