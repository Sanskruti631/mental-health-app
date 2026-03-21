import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.users.findMany({
      where: {
        role: "student",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(clients);

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}
