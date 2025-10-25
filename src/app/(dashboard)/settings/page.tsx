import { createServerComponentClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink } from "lucide-react";

export default async function SettingsPage() {
  const supabase = await createServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  return (
    <div className="container mx-auto py-8 px-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user?.email || ""} disabled />
            </div>
            <div>
              <Label htmlFor="subscription">Subscription Plan</Label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    profile?.subscription_tier === "free"
                      ? "secondary"
                      : "default"
                  }
                >
                  {profile?.subscription_tier || "free"} plan
                </Badge>
                {profile?.subscription_tier === "free" && (
                  <Button variant="outline" size="sm">
                    Upgrade
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Google Integration</CardTitle>
          </CardHeader>
          <CardContent>
            {profile?.google_connected ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Connected as {profile.google_email}</span>
                <Button variant="outline" size="sm">
                  Reconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Connect your Google account to access Google Sheets
                </p>
                <Button className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Connect Google Account
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* App Limits */}
        <Card>
          <CardHeader>
            <CardTitle>App Limits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Apps Created</Label>
                <div className="text-2xl font-bold">
                  {profile?.apps_created || 0}
                </div>
              </div>
              <div>
                <Label>Apps Limit</Label>
                <div className="text-2xl font-bold">
                  {profile?.apps_limit || 1}
                </div>
              </div>
            </div>
            {profile?.subscription_tier === "free" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  Upgrade to create more apps and unlock advanced features
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
