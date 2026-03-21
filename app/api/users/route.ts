import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ GET all users
export async function GET() {
  try {
    const users = await prisma.users.findMany({
      orderBy: { created_at: "desc" },
    });

    // convert DB → UI format
    const formattedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.is_active ? "Active" : "Inactive",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// ✅ ADD user
export async function POST(req: Request) {
  try {
    const { name, email, role } = await req.json();

    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        role,
        password_hash: "default123", // ⚠️ later use bcrypt
        is_active: true,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "User creation failed" }, { status: 500 });
  }
}

// ✅ DELETE user
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.users.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
// ✅ UPDATE user
export async function PUT(req: Request) {
  try {
    const { id, name, email, role } = await req.json();

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        name,
        email,
        role,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
