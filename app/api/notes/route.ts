import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { appointment_id, therapist_id, session_notes } = await req.json();

    if (!appointment_id || !therapist_id || !session_notes) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const note = await prisma.appointment_notes.create({
      data: {
        id: randomUUID(),
        appointment_id,
        therapist_id,
        session_notes,
      },
    });

    return NextResponse.json(note);

  } catch (error) {
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 });
  }
}
