"use client";

import Image from "next/image";
import STRATA_FULL_LOGO from "@/assets/STRATA_FULL_LOGO.png";
import PROFILE_LOGO from "@/assets/PROFILE_LOGO.svg";

export default function ProfileSetup() {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center overflow-hidden p-2">
      <div className="w-full max-w-[1100px] h-[620px] rounded-[20px] bg-white relative p-6 shadow-sm flex flex-col items-center">
        <button className="absolute top-6 left-6 flex items-center gap-1 text-[#465FF1] hover:text-[#3a4ec7] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#465FF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex justify-center mt-8">
          <Image src={STRATA_FULL_LOGO} alt="STRATA Logo" width={140} height={60} className="object-contain" priority />
        </div>

        <div className="flex flex-col items-center gap-1 mt-4 text-center">
          <h1 className="text-[24px] font-medium text-[#26203B] leading-tight">Customize Your Profile Picture</h1>
          <p className="text-lg text-[#9C9AA5] leading-snug">Setup your profile so everyone knows you!</p>
        </div>

        <div className="flex justify-center mt-6">
          <div className="w-[130px] h-[130px] relative rounded-full overflow-hidden border border-[rgba(156,154,165,0.3)]">
            <Image src={PROFILE_LOGO} alt="Profile placeholder" width={130} height={130} className="object-contain" priority />
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-6">
          <button className="flex items-center justify-center gap-3 w-[180px] h-10 px-4 py-2 rounded-lg border border-[rgba(70,95,241,0.4)] bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-[#26203B]">
            <svg width="20" height="20" viewBox="0 0 25 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M7.8684 8.79442C8.2824 8.79442 8.6184 9.13042 8.6184 9.54442C8.6184 9.95842 8.2824 10.2944 7.8684 10.2944H6.9354C5.3164 10.2944 4.0004 11.6104 4.0004 13.2284V18.1034C4.0004 19.7224 5.3164 21.0384 6.9354 21.0384H18.0654C19.6834 21.0384 21.0004 19.7224 21.0004 18.1034V13.2194C21.0004 11.6064 19.6884 10.2944 18.0764 10.2944H17.1334C16.7194 10.2944 16.3834 9.95842 16.3834 9.54442C16.3834 9.13042 16.7194 8.79442 17.1334 8.79442H18.0764C20.5154 8.79442 22.5004 10.7794 22.5004 13.2194V18.1034C22.5004 20.5494 20.5104 22.5384 18.0654 22.5384H6.9354C4.4904 22.5384 2.5004 20.5494 2.5004 18.1034V13.2284C2.5004 10.7834 4.4904 8.79442 6.9354 8.79442H7.8684ZM13.031 2.22202L15.947 5.15002C16.239 5.44402 16.238 5.91802 15.945 6.21002C15.651 6.50202 15.177 6.50202 14.885 6.20802L13.2494 4.56677L13.25 15.5413H11.75L11.7494 4.56677L10.116 6.20802C9.97 6.35602 9.777 6.42902 9.585 6.42902C9.394 6.42902 9.202 6.35602 9.056 6.21002C8.763 5.91802 8.761 5.44402 9.054 5.15002L11.969 2.22202C12.25 1.93902 12.75 1.93902 13.031 2.22202Z" fill="#26203B"/></svg>
            Upload Photo
          </button>

          <button className="flex items-center justify-center gap-3 w-[180px] h-10 px-4 py-2 rounded-lg border border-[rgba(70,95,241,0.4)] bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-[#26203B]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M20.7505 20.4395C21.1645 20.4395 21.5005 20.7755 21.5005 21.1895C21.5005 21.6035 21.1645 21.9395 20.7505 21.9395H13.4975C13.0835 21.9395 12.7475 21.6035 12.7475 21.1895C12.7475 20.7755 13.0835 20.4395 13.4975 20.4395H20.7505ZM16.1163 3.65364C16.1663 3.69264 17.8393 4.99264 17.8393 4.99264C18.4473 5.35464 18.9223 6.00164 19.1023 6.76764C19.2813 7.52564 19.1513 8.30764 18.7343 8.96864L18.7115 9.00038C18.3496 9.46164 16.8646 11.3222 16.8181 11.3916L16.7367 11.4818L16.188 12.1697C15.7177 12.7587 15.1599 13.4571 14.4981 14.2855L14.1584 14.7106C12.8807 16.3097 11.2444 18.3572 9.14827 20.9796C8.68927 21.5516 8.00127 21.8846 7.26227 21.8936L3.62327 21.9396C3.26627 21.9396 2.96427 21.7016 2.88327 21.3626L2.06427 17.8916C1.89527 17.1726 2.06327 16.4306 2.52427 15.8546L11.9443 4.07264C12.9883 2.82464 14.8563 2.64264 16.1163 3.65364Z" fill="#26203B"/></svg>
            Edit Photo
          </button>
        </div>

        <div className="flex flex-col items-center mt-8">
          <button className="w-[190px] h-10 rounded-lg bg-[#465FF1] hover:bg-[#3a4ec7] transition-colors text-white font-bold text-sm">Continue</button>
          <a href="#" className="text-xs text-[#9C9AA5] hover:text-[#7a7885] transition-colors mt-2">Skip for now</a>
        </div>
      </div>
    </div>
  );
}
