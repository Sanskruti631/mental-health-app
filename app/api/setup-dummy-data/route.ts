import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    // Check if dummy data already exists
    const existingCounselors = await prisma.users.findMany({
      where: { role: "therapist" },
      take: 1,
    });

    if (existingCounselors.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Dummy counselors already exist in the database!",
        counselorsCount: existingCounselors.length,
      });
    }

    // Create dummy therapists
    const dummyCounselors = [
      {
        email: "dr.sarah.johnson@university.edu",
        password: "Test@12345",
        name: "Dr. Sarah Johnson",
        licenseNumber: "LIC-PSY-001",
        specialties: ["Anxiety", "Depression", "Academic Stress", "Trauma"],
        yearsExperience: "12 years",
        bio: "Dr. Johnson is a licensed clinical psychologist with over a decade of experience working with students. She specializes in helping students manage academic stress, anxiety, and transition-related challenges.",
        rating: 4.9,
        hourlyRate: 500.00,
      },
      {
        email: "dr.michael.chen@university.edu",
        password: "Test@12345",
        name: "Dr. Michael Chen",
        licenseNumber: "LIC-PC-002",
        specialties: ["ADHD", "Social Anxiety", "Relationship Issues", "Career Counseling"],
        yearsExperience: "8 years",
        bio: "Dr. Chen is a licensed professional counselor who focuses on helping students with ADHD, social anxiety, and career planning. He uses a client-centered approach tailored to each student's unique needs.",
        rating: 4.8,
        hourlyRate: 400.00,
      },
      {
        email: "dr.emily.rodriguez@university.edu",
        password: "Test@12345",
        name: "Dr. Emily Rodriguez",
        licenseNumber: "LIC-MFT-003",
        specialties: ["Family Issues", "Cultural Identity", "Eating Disorders", "Self-Esteem"],
        yearsExperience: "10 years",
        bio: "Dr. Rodriguez is a licensed marriage and family therapist with expertise in family dynamics, cultural identity issues, and eating disorders. She provides a safe, non-judgmental space for students to explore their concerns.",
        rating: 4.9,
        hourlyRate: 450.00,
      },
    ];

    const createdCounselors = [];

    for (const counselor of dummyCounselors) {
      const passwordHash = await bcrypt.hash(counselor.password, 10);

      const user = await prisma.users.create({
        data: {
          email: counselor.email,
          password_hash: passwordHash,
          name: counselor.name,
          role: "therapist",
          is_verified: true,
          is_active: true,
          therapist_profiles: {
            create: {
              license_number: counselor.licenseNumber,
              specialties: counselor.specialties,
              years_experience: counselor.yearsExperience,
              bio: counselor.bio,
              rating: counselor.rating,
              hourly_rate: counselor.hourlyRate,
              is_accepting_patients: true,
              total_reviews: 0,
            },
          },
          therapist_availability: {
            createMany: {
              data: [
                { day_of_week: 1, start_time: new Date("2000-01-01T09:00:00"), end_time: new Date("2000-01-01T17:00:00"), is_available: true },
                { day_of_week: 2, start_time: new Date("2000-01-01T09:00:00"), end_time: new Date("2000-01-01T17:00:00"), is_available: true },
                { day_of_week: 3, start_time: new Date("2000-01-01T09:00:00"), end_time: new Date("2000-01-01T17:00:00"), is_available: true },
                { day_of_week: 4, start_time: new Date("2000-01-01T09:00:00"), end_time: new Date("2000-01-01T17:00:00"), is_available: true },
                { day_of_week: 5, start_time: new Date("2000-01-01T09:00:00"), end_time: new Date("2000-01-01T17:00:00"), is_available: true },
              ],
            },
          },
        },
        include: { therapist_profiles: true, therapist_availability: true },
      });

      createdCounselors.push({
        id: user.id,
        name: user.name,
        email: user.email,
        licenseNumber: counselor.licenseNumber,
      });
    }

    // Verify appointments table exists
    const appointmentsCheck = await prisma.$queryRaw`SHOW TABLES LIKE 'appointments'`;

    return NextResponse.json({
      success: true,
      message: "Dummy counselors created successfully!",
      counselors: createdCounselors,
      appointmentsTableExists: appointmentsCheck.length > 0,
      notes: [
        "Use these credentials to login as counselors:",
        "dr.sarah.johnson@university.edu / Test@12345",
        "dr.michael.chen@university.edu / Test@12345",
        "dr.emily.rodriguez@university.edu / Test@12345",
        "Appointments table is ready to use!",
      ],
    });
  } catch (error) {
    console.error("Setup dummy data error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
