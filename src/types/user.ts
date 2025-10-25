import type { UserProfile } from "./database";

export interface User extends UserProfile {
  email?: string;
  name?: string;
}

export interface UserSession {
  user: User;
  access_token: string;
  refresh_token?: string;
}
