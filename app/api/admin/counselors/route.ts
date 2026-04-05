import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get all therapists
    const counselors = await prisma.users.findMany({
      where: { role: "therapist" },
      select: {
        id: true,
        name: true,
        email: true,
        is_active: true,
        created_at: true,
      },
      orderBy: { name: "asc" },
    });

    // For each counselor, count their current sessions
    const formattedCounselors = await Promise.all(
      counselors.map(async (c) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Sessions today
        const sessionsToday = await prisma.appointments.count({
          where: {
            therapist_id: c.id,
            appointment_date: today,
            status: { in: ["pending", "confirmed"] },
          },
        });

        return {
          id: c.id,
          name: c.name,
          email: c.email,
          status: c.is_active ? "Active" : "Inactive",
          availability: sessionsToday > 3 ? "In Session" : "Available",
          sessionsToday,
          joinDate: c.created_at,
        };
      })
    );

    const stats = {
      totalCounselors: counselors.length,
      activeNow: formattedCounselors.filter(
        (c) => c.availability === "Available"
      ).length,
      inSession: formattedCounselors.filter(
        (c) => c.availability === "In Session"
      ).length,
      offline: formattedCounselors.filter((c) => c.status === "Inactive").length,
      counselors: formattedCounselors,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to load counselors:", error);
    return NextResponse.json(
      { error: "Failed to load counselors" },
      { status: 500 }
    );
  }
}
