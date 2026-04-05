import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get recent users
    const users = await prisma.users.findMany({
      where: { role: "student" },
      select: {
        id: true,
        name: true,
        email: true,
        is_active: true,
        created_at: true,
      },
      orderBy: { created_at: "desc" },
      take: 20,
    });

    // Get total and active counts
    const totalUsers = await prisma.users.count({
      where: { role: "student" },
    });

    const activeUsers = await prisma.users.count({
      where: {
        role: "student",
        is_active: true,
      },
    });

    // Get pending approvals (new users not approved yet)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const pendingUsers = await prisma.users.count({
      where: {
        role: "student",
        created_at: {
          gte: sevenDaysAgo,
        },
        is_active: false,
      },
    });

    const formattedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      status: u.is_active ? "Active" : "Inactive",
      joinDate: u.created_at,
    }));

    return NextResponse.json({
      stats: {
        totalUsers,
        activeToday: activeUsers,
        pendingApproval: pendingUsers,
      },
      users: formattedUsers,
    });
  } catch (error) {
    console.error("Failed to load users:", error);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }
}
