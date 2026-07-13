import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' ? `${window.location.origin}/api/auth` : `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}/api/auth`,
  plugins: [adminClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;
