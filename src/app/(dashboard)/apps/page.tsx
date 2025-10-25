import { createServerComponentClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppWindow, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function AppsPage() {
  const supabase = await createServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: apps } = await supabase
    .from("apps")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Apps</h1>
          <p className="text-gray-600">Manage your SaaS applications</p>
        </div>
        <Link href="/apps/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New App
          </Button>
        </Link>
      </div>

      {apps && apps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{app.name}</CardTitle>
                  <Badge variant={app.is_published ? "default" : "secondary"}>
                    {app.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{app.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">
                    <strong>Views:</strong> {app.views_count}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Template:</strong> {app.template_type}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Created:</strong>{" "}
                    {new Date(app.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/apps/${app.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Manage
                    </Button>
                  </Link>
                  {app.is_published && (
                    <Link href={`/a/${app.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <AppWindow className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No apps yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first SaaS app from a Google Sheet
            </p>
            <Link href="/apps/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Your First App
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
