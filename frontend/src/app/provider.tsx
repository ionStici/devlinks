import React from "react";
import { AuthProvider } from "@/lib/auth-context";

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
