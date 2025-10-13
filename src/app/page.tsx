"use client";

import Image from 'next/image'
import Logo from "@/assets/STRATA_SQUARE LOGO 1.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Registration from "@/components/custom/landing/Registration";
import Login from "@/components/custom/landing/Login";

export default function Landing() {
  return (
    <div className="p-4 w-dvw h-dvh block md:flex">
      <div className="w-1/3 bg-primary rounded-2xl text-white flex flex-col justify-between">
        <div className="mt-16">
          <h1
            className="text-4xl font-bold text-center">
              Welcome to STRATA
          </h1>
          <p
            className="text-center"
          >
            Your Gateway to Effortless Management.
          </p>
        </div>
        
        <div className="mb-16">
          <h1
            className="text-4xl font-bold text-center"
          >
            Organize Your World
          </h1>
          <p
            className="text-center"
          >
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
              className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-white"
            >Sign Up</TabsTrigger>
            <TabsTrigger
            value="sign-in"
            className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-white"
            >Sign In</TabsTrigger>
          </TabsList>
          <Registration />
          <Login />
        </Tabs>
      </div>
    </div>
  );
}