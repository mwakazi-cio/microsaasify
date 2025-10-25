import { NextRequest, NextResponse } from "next/server";
import { getGoogleAuthUrl } from "@/lib/google/auth";
import { createServerActionClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated
    const supabase = await createServerActionClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Generate Google OAuth URL
    const authUrl = getGoogleAuthUrl();

    // Redirect to Google
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error("Google OAuth initiation error:", error);
    return NextResponse.json(
      { error: "Failed to initiate Google OAuth" },
      { status: 500 }
    );
  }
}
