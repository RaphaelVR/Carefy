"use client"

import { ColumnDef } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"

import StatusBadge from "../StatusBadge"
import { Appointment } from "@/types/appwrite.types"
import { Doctors } from "@/constants"
import Image from "next/image"
import { formatDateTime } from "@/lib/utils"
import AppointmentModal from "../AppointmentModal"

export const columns: ColumnDef<Appointment>[] = [
    {
        header: "ID",
        cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
    },
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => {
                const appointment = row.original;
                return <p className="text-14-medium ">{appointment.patient.name}</p>;
            },
        },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const appointment = row.original;
                return (
                    <div className="min-w-[115px]">
                        <StatusBadge status={appointment.status} />
                    </div>
            );
        },
    },        
    {
        accessorKey: "schedule",
        header: "Appointment",
        cell: ({ row }) => {
        const appointment = row.original;

        return (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(appointment.schedule).dateTime}
            </p>
        );
        },
    },
    {
        accessorKey: "primaryPhysician",
        header: "Doctor",
        cell: ({ row }) => {
            const appointment = row.original;
            const doctor = Doctors.find((doctor) => doctor.name === appointment.primaryPhysician);

            return (
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image!}
                        alt="doctor"
                        width={100}
                        height={100}
                        className="size-8"
                    />
                    <p className="whitespace-nowrap">
                        Dr. {doctor?.name}
                    </p>
                </div>
            )
        },
    },  
    {
      id: "actions",
      header: () => <div className="pl-4">Actions</div>,
      cell: ({ row: { original: data } }) => {
        return (
            <div className="flex gap-1">
                <AppointmentModal 
                    type='schedule'
                    patientId={data.patient.id}
                    userId={data.userId}
                    appointmentId={data}              
                />
                <AppointmentModal 
                    type='cancel'
                    patientId={data.patient.id}
                    userId={data.userId}
                    appointmentId={data}              
                />
            </div>
        )
      },
    },
]
