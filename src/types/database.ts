export type SubscriptionTier = "free" | "maker" | "pro";
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing";
export type AppTemplateType =
  | "directory"
  | "dashboard"
  | "crm"
  | "catalog"
  | "portal"
  | "custom";

export interface UserProfile {
  id: string;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus;
  paystack_customer_code: string | null;
  paystack_subscription_code: string | null;
  apps_created: number;
  apps_limit: number;
  google_connected: boolean;
  google_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface App {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  google_sheet_id: string;
  google_sheet_name: string | null;
  google_sheet_range: string;
  refresh_token: string | null;
  template_type: AppTemplateType;
  theme: AppTheme;
  custom_domain: string | null;
  domain_verified: boolean;
  auth_enabled: boolean;
  payment_enabled: boolean;
  payment_config: PaymentConfig;
  settings: AppSettings;
  is_published: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  last_synced: string | null;
}

export interface AppTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  logo: string | null;
}

export interface PaymentConfig {
  price: number;
  currency: "KES" | "USD";
  interval: "monthly" | "yearly" | "one-time";
}

export interface AppSettings {
  showHeader: boolean;
  showFooter: boolean;
  enableSearch: boolean;
  enableFilters: boolean;
  itemsPerPage: number;
}

export interface SheetCache {
  id: string;
  app_id: string;
  data: any;
  headers: any;
  row_count: number;
  cached_at: string;
  expires_at: string;
}
