import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const headers = request.headers;

    // Vercel Geolocation Headers
    const countryCode = headers.get("x-vercel-ip-country") || "";
    const city = headers.get("x-vercel-ip-city") || "";
    const region = headers.get("x-vercel-ip-country-region") || "";
    const forwardedFor = headers.get("x-forwarded-for") || "";
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "";

    return NextResponse.json({
      countryCode: countryCode.toUpperCase(),
      city: decodeURIComponent(city),
      region: decodeURIComponent(region),
      ip,
      isNepal: countryCode.toUpperCase() === "NP",
    });
  } catch (error) {
    console.error("Detect location error:", error);
    return NextResponse.json({
      countryCode: "",
      city: "",
      region: "",
      ip: "",
      isNepal: false,
    });
  }
}
