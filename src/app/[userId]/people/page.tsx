"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowDownWideNarrow,
  Bell,
  Calendar as CalendarIcon
} from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const rows = [
  {
    id: "0000",
    employee: "Justin Carlo Borja",
    role: "UI/UX Designer",
    break: "00:24:55",
    date: "Sept 19, 2025",
    status: ["Active"],
    checkIn: "09:00",
    checkOut: "18:00",
    workHours: "10h 2m"
  },
  {
    id: "0001",
    employee: "Justin Carlo Borja",
    role: "UI/UX Designer",
    break: "00:24:55",
    date: "Sept 19, 2025",
    status: ["Absent"],
    checkIn: "00:00",
    checkOut: "00:00",
    workHours: "0m"
  },
  {
    id: "0002",
    employee: "Justin Carlo Borja",
    role: "UI/UX Designer",
    break: "00:24:55",
    date: "Sept 19, 2025",
    status: ["Late", "Active"],
    checkIn: "10:30",
    checkOut: "18:00",
    workHours: "8h 30m"
  },
  {
    id: "0003",
    employee: "Justin Carlo Borja",
    role: "UI/UX Designer",
    break: "00:24:55",
    date: "Sept 19, 2025",
    status: ["Active", "On a Break"],
    checkIn: "09:00",
    checkOut: "18:00",
    workHours: "10h 2m"
  },
  {
    id: "0004",
    employee: "Justin Carlo Borja",
    role: "UI/UX Designer",
    break: "00:24:55",
    date: "Sept 19, 2025",
    status: ["Active"],
    checkIn: "09:00",
    checkOut: "18:00",
    workHours: "10h 2m"
  },
  {
    id: "0005",
    employee: "Justin Carlo Borja",
    role: "UI/UX Designer",
    break: "00:24:55",
    date: "Sept 19, 2025",
    status: ["AFK"],
    checkIn: "09:00",
    checkOut: "18:00",
    workHours: "10h 2m"
  },
]

export default function People() {
  const [date, setDate] = useState<Date>();
  return (
    <div className="p-4 w-full">
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
        <CardHeader>
          <div className="flex">
            <CardTitle className="text-primary-dark font-semibold">People Overview</CardTitle>
            <div className="flex ml-auto">
              <Input type="search" placeholder="Search" className="mr-2" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground
                    w-56 justify-start text-left font-normal mr-2"
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
              <Select>
                <SelectTrigger className="w-40">
                  <ArrowDownWideNarrow />
                  <SelectValue placeholder="Filter"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Date">Date</SelectItem>
                    <SelectItem value="Name">Name</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-t-2 border-b-2 border-gray-300">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Break Left</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Work Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell className="text-gray-400">{row.role}</TableCell>
                  <TableCell className="text-gray-400">{row.break}</TableCell>
                  <TableCell className="text-gray-400">{row.date}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {row.status.map((s, index) => {
                        let style = "";
                        if(s === "Active") style = "bg-green-300";
                        else if(s === "Absent" || s === "AFK") style = "bg-red-100 text-red-600"
                        else if(s === "Late" || s === "On a Break") style = "bg-yellow-200"
                        return (
                          <div key={index} className={`mr-2 px-2 py-1 rounded-sm ${style}`}>{s}</div>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell>{row.checkIn}</TableCell>
                  <TableCell>{row.checkOut}</TableCell>
                  <TableCell>{row.workHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationPrevious href="#" />
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationNext href="#" />
              </PaginationContent>
            </Pagination>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}