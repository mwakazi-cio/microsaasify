import { createServerComponentClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppWindow, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const { data: apps, count: appsCount } = await supabase
    .from("apps")
    .select("*", { count: "exact" })
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const totalViews = apps?.reduce((sum, app) => sum + app.views_count, 0) || 0;
  const publishedApps = apps?.filter((app) => app.is_published).length || 0;

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-600">Here's what's happening with your apps</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
            <AppWindow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appsCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              {profile?.apps_limit - (profile?.apps_created || 0)} remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">Across all apps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Published Apps
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedApps}</div>
            <p className="text-xs text-muted-foreground">Live and accessible</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/apps/new">
              <Button className="w-full" size="lg">
                Create New App
              </Button>
            </Link>
            <Link href="/apps">
              <Button variant="outline" className="w-full" size="lg">
                View All Apps
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Apps */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Apps</CardTitle>
        </CardHeader>
        <CardContent>
          {apps && apps.length > 0 ? (
            <div className="space-y-4">
              {apps.map((app) => (
                <Link
                  key={app.id}
                  href={`/apps/${app.id}`}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{app.name}</h3>
                    <p className="text-sm text-gray-600">
                      {app.views_count} views •{" "}
                      {app.is_published ? "Published" : "Draft"}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AppWindow className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">No apps yet</p>
              <Link href="/apps/new">
                <Button>Create Your First App</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
