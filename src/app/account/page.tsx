"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import STRATA_FULL_LOGO from "@/assets/STRATA_FULL_LOGO.png";
import Lottie from "lottie-react";
import CHECK_ANIMATION from "@/assets/check.json";

export default function Profile() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-2">
      <div className="w-full max-w-[1376px] min-h-[720px] rounded-[20px] bg-white relative p-9 flex flex-col items-center shadow-sm">
        <div className="flex justify-center mt-2">
          <Image src={STRATA_FULL_LOGO} alt="STRATA Logo" width={168} height={78} className="object-contain" priority />
        </div>

        <div className="mt-10 flex flex-col items-center">
          <Lottie animationData={CHECK_ANIMATION} loop={true} className="w-[285px] h-[284px] -m-15" />
          <h1 className="mt-10 text-[28px] sm:text-[32px] font-medium text-[#26203B] text-center">Account created successfully!</h1>
          <p className="mt-2 text-lg sm:text-2xl text-[#9C9AA5] text-center">Welcome aboard! Start your success journey with STRATA!</p>
        </div>

        <div className="mt-14">
          <button
            onClick={() => router.push("/account/success")}
            className="flex items-center justify-center w-[210px] h-12 px-5 py-2.5 rounded-lg bg-[#465FF1] hover:bg-[#3a4ec7] transition-colors text-white font-bold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
