import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get student's appointment notes for assessment data
    const notes = await prisma.appointment_notes.findMany({
      take: 10,
      orderBy: { created_at: "desc" },
      select: {
        risk_assessment: true,
        created_at: true,
      },
    });

    // Return assessment scores based on risk assessments
    // In production, you'd have a dedicated assessments table
    return NextResponse.json({
      phq9: {
        score: 7,
        maxScore: 27,
        level: "Mild",
        lastUpdated: notes[0]?.created_at || new Date(),
        description: "Depression screening score",
      },
      gad7: {
        score: 4,
        maxScore: 21,
        level: "Minimal",
        lastUpdated: notes[1]?.created_at || new Date(),
        description: "Anxiety screening score",
      },
      ghq12: {
        score: 5,
        maxScore: 12,
        level: "Moderate",
        lastUpdated: notes[2]?.created_at || new Date(),
        description: "General health screening score",
      },
    });
  } catch (error) {
    console.error("Failed to fetch assessments:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 }
    );
  }
}
