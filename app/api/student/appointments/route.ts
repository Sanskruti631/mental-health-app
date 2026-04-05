import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get upcoming appointments for the student
    const today = new Date();
    const upcoming = await prisma.appointments.findMany({
      where: {
        appointment_date: {
          gte: today,
        },
        status: { in: ["pending", "confirmed"] },
      },
      include: {
        users_appointments_therapist_idTousers: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { appointment_date: "asc" },
      take: 5,
    });

    return NextResponse.json(
      upcoming.map((apt) => ({
        id: apt.id,
        therapist: apt.users_appointments_therapist_idTousers.name,
        date: apt.appointment_date,
        time: apt.appointment_time,
        type: apt.session_type,
        status: apt.status,
      }))
    );
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
