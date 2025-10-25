import { createServerComponentClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default async function BillingPage() {
  const supabase = await createServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const plans = [
    {
      name: "Free",
      price: 0,
      currency: "KES",
      description: "Perfect for getting started",
      features: [
        "1 app",
        "Basic templates",
        "Community support",
        "Standard sync",
      ],
      current: profile?.subscription_tier === "free",
    },
    {
      name: "Maker",
      price: 1500,
      currency: "KES",
      description: "For serious creators",
      features: [
        "5 apps",
        "All templates",
        "Priority support",
        "Real-time sync",
        "Custom domains",
        "Analytics",
      ],
      current: profile?.subscription_tier === "maker",
    },
    {
      name: "Pro",
      price: 3900,
      currency: "KES",
      description: "For growing businesses",
      features: [
        "Unlimited apps",
        "All templates",
        "Priority support",
        "Real-time sync",
        "Custom domains",
        "Advanced analytics",
        "API access",
        "White-label",
      ],
      current: profile?.subscription_tier === "pro",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Billing & Plans</h1>
        <p className="text-gray-600">Choose the plan that's right for you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.current ? "ring-2 ring-blue-600" : ""}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.current && <Badge>Current Plan</Badge>}
              </div>
              <div className="text-3xl font-bold">
                {plan.price === 0
                  ? "Free"
                  : `${plan.currency} ${plan.price.toLocaleString()}/mo`}
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.current ? (
                <Button disabled className="w-full">
                  Current Plan
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant={plan.name === "Free" ? "outline" : "default"}
                >
                  {plan.name === "Free" ? "Downgrade" : "Upgrade"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Payment methods will be managed through Paystack
              </p>
              <Button variant="outline">Manage Payment Methods</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
