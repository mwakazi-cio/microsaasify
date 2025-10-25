import type { App, AppTheme, PaymentConfig, AppSettings } from "./database";

export interface CreateAppData {
  name: string;
  description?: string;
  google_sheet_id: string;
  google_sheet_name?: string;
  google_sheet_range?: string;
  template_type: "directory" | "dashboard" | "crm" | "catalog" | "portal";
}

export interface UpdateAppData {
  name?: string;
  description?: string;
  theme?: Partial<AppTheme>;
  payment_config?: Partial<PaymentConfig>;
  settings?: Partial<AppSettings>;
  is_published?: boolean;
}

export type { App, AppTheme, PaymentConfig, AppSettings };
