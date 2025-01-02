import PlausibleProvider from "next-plausible";
import { APP_DOMAIN } from "./app-config";

export default function Providers({ children }: { children: React.ReactNode }) {
  // ignore analytics during dev
  if (process.env.NODE_ENV === "production") {
    return (
      <PlausibleProvider domain={APP_DOMAIN}>{children}</PlausibleProvider>
    );
  }

  return children;
}
