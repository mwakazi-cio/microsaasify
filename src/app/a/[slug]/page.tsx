import { createServerComponentClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AppPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const supabase = await createServerComponentClient();

  const { data: app } = await supabase
    .from("apps")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!app) {
    notFound();
  }

  // Increment view count
  await supabase.rpc("increment_app_views", { app_slug: slug });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{app.name}</h1>
              {app.description && (
                <p className="text-gray-600">{app.description}</p>
              )}
            </div>
            <Badge variant="outline">{app.template_type}</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-xl font-semibold mb-2">App Preview</h2>
              <p className="text-gray-600 mb-6">
                This is where your generated SaaS app will be displayed. The
                actual app generation will be implemented in the next milestone.
              </p>
              <div className="bg-gray-100 rounded-lg p-8">
                <p className="text-gray-500">
                  Connected to Google Sheet:{" "}
                  {app.google_sheet_name || "Untitled"}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Template: {app.template_type} • Views: {app.views_count}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            Powered by <span className="font-semibold">MicroSaaSify</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
