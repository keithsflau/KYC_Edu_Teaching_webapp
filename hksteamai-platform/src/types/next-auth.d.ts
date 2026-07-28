import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
      locale: string;
    };
  }
}

declare module "next-auth" {
  interface User {
    role?: string;
    locale?: string;
  }
}
