"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  AppWindow,
  Settings,
  CreditCard,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types/database";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Apps", href: "/apps", icon: AppWindow },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Billing", href: "/billing", icon: CreditCard },
];

export function Sidebar({ profile }: { profile: UserProfile | null }) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg" />
          <span className="font-bold text-lg">MicroSaaSify</span>
        </Link>
      </div>

      <div className="px-4 mb-4">
        <Link href="/apps/new">
          <Button className="w-full gap-2">
            <PlusCircle className="w-4 h-4" />
            New App
          </Button>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium mb-1">
            {profile?.subscription_tier === "free"
              ? "Free Plan"
              : profile?.subscription_tier === "maker"
              ? "Maker Plan"
              : "Pro Plan"}
          </div>
          <div className="text-xs text-gray-600 mb-3">
            {profile?.apps_created || 0} / {profile?.apps_limit || 1} apps
            created
          </div>
          {profile?.subscription_tier === "free" && (
            <Link href="/billing">
              <Button size="sm" variant="outline" className="w-full">
                Upgrade
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
