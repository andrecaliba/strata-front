"use client";

import Image from 'next/image'
import Logo from "@/assets/STRATA_SQUARE LOGO 1.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Registration from "@/components/custom/landing/Registration";
import Login from "@/components/custom/landing/Login";
import LANDING_BG from "@/assets/LANDING_BG.png";

export default function Landing() {
  return (
    <div className="w-screen h-screen flex">
      {/* Left Section */}
      <div className="w-1/2 h-full relative overflow-hidden flex flex-col justify-between text-white p-16">
        <Image src={LANDING_BG} alt="Landing Background" fill className="object-cover object-center" priority/>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(70,95,241,0.37)] to-[#465FF1] z-10"></div>
        <div className="relative z-20 mt-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome to STRATA
          </h1>
          <p className="text-base md:text-lg opacity-90">
            Your Gateway to Effortless Management.
          </p>
        </div>

        <div className="relative z-20 mb-20 text-center">
          <h1 className="text-2xl font-semibold mb-2">Organize Your World</h1>
          <p className="text-base md:text-lg opacity-90">
            Achieve greater team alignment through instant collaboration.
          </p>
        </div>
      </div>
      <div className="w-2/3 flex flex-col items-center">
        <div className="flex">
          <Image src={Logo} alt="strata-logo" className="w-24 h-24"/>
          <div className="flex items-center -m-4">
            <h1 className="text-3xl text-primary-dark font-semibold">TRATA</h1>
          </div>
        </div>
        <Tabs defaultValue="sign-up">
          <TabsList className="bg-backdrop w-96 my-8">
            <TabsTrigger
              value="sign-up"
              className="cursor-pointer data-[state=active]:bg-primary-blue data-[state=active]:text-white"
            >Sign Up</TabsTrigger>
            <TabsTrigger
            value="sign-in"
            className="cursor-pointer data-[state=active]:bg-primary-blue data-[state=active]:text-white"
            >Sign In</TabsTrigger>
          </TabsList>
          <Registration />
          <Login />
        </Tabs>
      </div>
    </div>
  );
}