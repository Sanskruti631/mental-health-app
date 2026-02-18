import { NextResponse } from "next/server"
import { MentalHealthFeaturesSchema } from "@/lib/ai/mentalHealthFeatures"
import { predictRisk } from "@/lib/ai/predictRisk"
import { getSecurityHeaders } from "@/lib/auth-utils"

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const parsed = MentalHealthFeaturesSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid feature payload",
          issues: parsed.error.issues.map((i) => ({
            path: i.path,
            message: i.message,
          })),
        },
        { status: 400, headers: getSecurityHeaders() }
      )
    }

    const risk = predictRisk(parsed.data)

    return NextResponse.json(
      {
        risk,
        timestamp: new Date().toISOString(),
      },
      { headers: getSecurityHeaders() }
    )
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: getSecurityHeaders() }
    )
  }
}

