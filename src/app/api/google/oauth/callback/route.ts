import { NextRequest, NextResponse } from "next/server";
import { getGoogleTokens, getGoogleUserInfo } from "@/lib/google/auth";
import { createServerActionClient } from "@/lib/supabase/server";
import crypto from "crypto";

// Encrypt refresh token before storing
function encrypt(text: string): string {
  const algorithm = "aes-256-cbc";
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, "utf8");
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/dashboard?error=${error}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/dashboard?error=no_code", request.url)
      );
    }

    // Exchange code for tokens
    const tokens = await getGoogleTokens(code);

    if (!tokens.access_token) {
      throw new Error("No access token received");
    }

    // Get user info
    const userInfo = await getGoogleUserInfo(tokens.access_token);

    // Get current user
    const supabase = await createServerActionClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Encrypt and store refresh token
    const encryptedRefreshToken = tokens.refresh_token
      ? encrypt(tokens.refresh_token)
      : null;

    // Update user profile with Google connection
    const { error: updateError } = await supabase
      .from("user_profiles")
      .update({
        google_connected: true,
        google_email: userInfo.email,
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Failed to update profile:", updateError);
    }

    // Store tokens in session or database
    // For now, we'll pass them to the frontend via URL params (not secure for production)
    // In production, store in httpOnly cookies or database

    return NextResponse.redirect(
      new URL(`/apps/new?google_connected=true`, request.url)
    );
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/dashboard?error=oauth_failed", request.url)
    );
  }
}
