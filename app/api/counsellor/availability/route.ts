import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock data - in a real app, this would come from the database
    const availability = {
      currentStatus: "available",
      nextAvailable: "Tomorrow 9:00 AM",
      todaySchedule: [
        { time: "9:00 AM", status: "available" },
        { time: "10:00 AM", status: "booked" },
        { time: "11:00 AM", status: "available" },
        { time: "2:00 PM", status: "booked" },
        { time: "3:00 PM", status: "available" },
        { time: "4:00 PM", status: "booked" },
      ],
    }

    return NextResponse.json(availability)
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { currentStatus, nextAvailable, todaySchedule } = body

    // In a real app, this would update the database
    // For now, we'll just return success
    const updatedAvailability = {
      currentStatus: currentStatus || "available",
      nextAvailable: nextAvailable || "Tomorrow 9:00 AM",
      todaySchedule: todaySchedule || [
        { time: "9:00 AM", status: "available" },
        { time: "10:00 AM", status: "booked" },
        { time: "11:00 AM", status: "available" },
        { time: "2:00 PM", status: "booked" },
        { time: "3:00 PM", status: "available" },
        { time: "4:00 PM", status: "booked" },
      ],
    }

    return NextResponse.json({
      message: "Availability updated successfully",
      availability: updatedAvailability
    })
  } catch (error) {
    console.error("Error updating availability:", error)
    return NextResponse.json({ error: "Failed to update availability" }, { status: 500 })
  }
}