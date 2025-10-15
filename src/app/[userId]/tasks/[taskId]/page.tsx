"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Users, Clock, CheckCircle2, Check } from "lucide-react";
import AppSidebar from "@/components/custom/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import profileImg from "@/assets/profile.jpg";
import STRATA_FULL_LOGO from "@/assets/strataLogoHd.png";

export default function TaskDetails() {
  return (
    <div className="bg-white py-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[10px] border border-[#D9D9D9] overflow-hidden">
          <div className="w-full bg-white relative overflow-hidden flex justify-center">
            <div className="w-full max-w-[600px] aspect-[1226/300]">
              <Image
                src={STRATA_FULL_LOGO}
                alt="Hero Image"
                className="w-full h-full object-contain rounded-t-[10px]"
                priority
              />
            </div>
          </div>

          <div className="p-3 md:p-4 lg:p-6">
            <div className="flex flex-col gap-3 mb-8">
              <h1 className="text-[24px] font-bold leading-[28px] text-[#141522]">
                Refining Webapp UI/UX
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[14px] font-normal leading-[18px] text-[#54577A]">
                    UI UX Design . Webapp Design
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-[4px]">
                  <Users className="w-4 h-4 text-[#54577A]" strokeWidth={1.5} />
                  <span className="text-[13px] font-normal leading-4 text-[#141522]">
                      4 Members involved
                  </span>
                </div>
                <div className="flex items-center gap-[4px]">
                    <Clock className="w-4 h-4 text-[#54577A]" strokeWidth={1.5} />
                    <span className="text-[13px] font-normal leading-4 text-[#141522]">
                        2 Months
                    </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-[20px] font-bold leading-6 text-[#141522]">
                Description
              </h2>
              <p className="text-[13px] font-normal leading-[24px] text-[#141522] max-w-[672px]">
                Design a WPH Website from scratch for the WPH Hackathon 2025.
                Be creative and let your imagination run wild. After designing it,
                you can now start developing the website/webapp/mobile app when you
                passed the 2nd stage of the group stage.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-[20px] font-bold leading-6 text-[#141522]">
                Goals of the Hackathon
              </h2>
              <div className="flex flex-col gap-2">
                {[
                    "Understanding the tools in Figma",
                    "Understand the basics of design decisions",
                    "Overhaul the whole WPH Website",
                    "Design a well thought-off Flowchart.",
                ].map((goal, idx) => (
                    <div key={idx} className="flex items-center gap-[8px]">
                        <div className="relative w-4 h-4">
                            <CheckCircle2 className="absolute inset-0 w-4 h-4 text-[#546FFF]" />
                            <Check className="absolute inset-0 w-3 h-3 text-white m-auto" />
                        </div>
                        <span className="text-[13px] font-normal leading-[24px] text-[#141522]">
                            {goal}
                        </span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}