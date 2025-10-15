"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Timer,
  Bell,
  DoorOpen,
  Clock
} from "lucide-react";
import { Input } from "@/components/ui/input";
import QuotePic from "@/assets/quote-pic.png";
import Image from "next/image";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const chartData = [
    { day: "Oct 1", hours: 0 },
    { day: "Oct 2", hours: 1 },
    { day: "Oct 3", hours: 2 },
    { day: "Oct 4", hours: 3 },
    { day: "Oct 5", hours: 4 },
    { day: "Oct 6", hours: 5 },
    { day: "Oct 7", hours: 6 },
    { day: "Oct 8", hours: 0 },
    { day: "Oct 9", hours: 1 },
    { day: "Oct 10", hours: 2 },
    { day: "Oct 11", hours: 3 },
    { day: "Oct 12", hours: 4 },
    { day: "Oct 13", hours: 5 },
    { day: "Oct 14", hours: 6 },
    { day: "Oct 15", hours: 0 },
    { day: "Oct 16", hours: 1 },
    { day: "Oct 17", hours: 2 },
    { day: "Oct 18", hours: 3 },
    { day: "Oct 19", hours: 4 },
    { day: "Oct 20", hours: 5 },
    { day: "Oct 21", hours: 6 },
  ]

  const chartConfig = {
    hours: {
      label: "Hours",
      color: "#455eee"
    }
  } satisfies ChartConfig;
  return (
    <div className="p-4 w-full overflow-y-auto">
      <Card>
        <CardContent className="flex">
          <Input type="search" className="w-80" placeholder="Search"/>
          <div className="flex ml-auto">
            <Bell className="w-6 h-6"/>
            <div className="ml-2 bg-blue-300 rounded-full w-8 h-8"></div>
            <div className="ml-2">
              <p className="font-semibold text-xs">Justin Carlo Unggoy</p>
              <p className="text-xs">Employee</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Card className="gap-0 border-blue-100 border-2">
              <CardHeader className="text-primary-dark">Total Working Hours</CardHeader>
              <CardContent className="text-primary-dark font-bold text-3xl">0 Hr 40 Mins 55 Secs</CardContent>
            </Card>
            <Card className="gap-0 border-blue-100 border-2">
              <CardHeader className="text-primary-dark">Remaining Break Time</CardHeader>
              <CardContent className="text-primary-dark font-bold text-3xl">01 Hr 00 Mins 00 Secs</CardContent>
            </Card>
            <Card className="gap-0 border-blue-100 border-2">
              <CardContent className="flex">
                <Timer className="w-8 h-8" color="#455eee"/>
                <Button className="ml-2 flex-1 bg-primary-blue cursor-pointer">Start Break</Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="flex-1 border-blue-100 border-2">
              <CardContent className="flex justify-center items-center">
                <span className="text-xl text-primary-blue font-semibold">
                  &quot;It&apos;s not the hours you put in your work<br/>
                  that counts, it&apos;s the work you put in the <br/>
                  hours. &quot; -Sam Ewing
                </span>
              </CardContent>
            </Card>
            <Card className="gap-0 border-blue-100 border-2">
              <CardContent className="flex">
                <DoorOpen className="w-8 h-8" color="#f04d23" />
                <Button className="ml-2 flex-1 bg-time-out cursor-pointer">Time Out</Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <Card className="flex items-center border-blue-100 border-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
              />
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="flex mt-4 gap-4">
        <div className="w-96">
          <Card>
            <CardHeader className="font-semibold">
              Task Today
            </CardHeader>
            <CardContent>
              <div>
                <h5 className="font-semibold">Refining Webapp UI/UX</h5>
                <h6 className="text-xs">UI/UX Designer</h6>
              </div>
              <div className="mt-4 mb-2">
                <div className="flex">
                  <h5>Progress</h5>
                  <h5 className="ml-auto">90%</h5>
                </div>
              </div>
              <Slider defaultValue={[90]} max={100} disabled/>
              <div className="flex mt-4 mb-6">
                <Clock />
                <span className="ml-2">Due Today</span>
              </div>
              <div className="flex">
                <h5 className="font-bold">Detail Task</h5>
                <p className="ml-auto font-light">UI/UX Designer</p>
              </div>
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <span className="rounded-sm bg-gray-200 py-2 px-4">1</span>
                  <p className="ml-2">Overhaul the entire website of WPH</p>
                </div>
                <div className="flex items-center">
                  <span className="rounded-sm bg-gray-200 py-2 px-4">2</span>
                  <p className="ml-2">Understand the basics of design decisions</p>
                </div>
              </div>
              <div className="mt-2 flex">
                <Button className="flex-1 bg-primary-blue cursor-pointer">Go to Details</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex">
            <Card className="h-80 w-[512px]">
              <CardHeader className="gap-0">
                <div className="flex">
                  <h5 className="font-bold">My Tasks</h5>
                  <button className="ml-auto text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
                    View all
                  </button>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Project</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Assigned To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2 pr-4">
                          <Checkbox />
                          <div>
                            <p className="font-bold">STRATA UI/UX Design</p>
                            <div className="flex items-center">
                              <Progress value={33} />
                              <p className="ml-2">33%</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center text-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                            Easy
                          </div>
                          <p className="text-gray-400">Completed</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2 pr-4">
                          <Checkbox />
                          <div>
                            <p className="font-bold">STRATA UI/UX Design</p>
                            <div className="flex items-center">
                              <Progress value={33} />
                              <p className="ml-2">33%</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center text-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                            Easy
                          </div>
                          <p className="text-gray-400">Completed</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2 pr-4">
                          <Checkbox />
                          <div>
                            <p className="font-bold">STRATA UI/UX Design</p>
                            <div className="flex items-center">
                              <Progress value={33} />
                              <p className="ml-2">33%</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center text-green-600">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                            Easy
                          </div>
                          <p className="text-gray-400">Completed</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2 pr-4">
                          <Checkbox />
                          <div>
                            <p className="font-bold">STRATA UI/UX Design</p>
                            <div className="flex items-center">
                              <Progress value={33} />
                              <p className="ml-2">33%</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center text-orange-600">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                            Moderate
                          </div>
                          <p className="text-gray-400">In Progress</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="ml-4 w-72 h-96 overflow-y-auto">
              <CardHeader>
                <div className="flex">
                  <h5 className="font-bold">People</h5>
                  <button className="ml-auto text-xs text-gray-400 hover:text-gray-600 cursor-pointer">
                    View all
                  </button>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <Card className="mb-2">
                  <CardContent>
                    <div className="flex items-center gap-0">
                      <div className="w-6 h-6 rounded-full bg-gray-500"></div>
                      <div className="ml-2">
                        <p className="text-xs font-semibold">Daniel Padilla</p>
                        <p className="text-xs font-light">UI/UX Designer</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xs font-light">Active</p>
                        <p className="text-xs font-light">1:00:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Card className="mt-4">
        <CardHeader className="font-bold">My Attendance</CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-96">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false}/>
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={true}
              />
              <Bar dataKey="hours" radius={1}/>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}