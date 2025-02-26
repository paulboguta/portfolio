import { OpenPanelComponent } from "@openpanel/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  // ignore analytics during dev
  if (process.env.NODE_ENV === "production") {
    return (
      <OpenPanelComponent
        apiUrl="/api/op"
        clientId={process.env.OPEN_PANEL_CLIENT_ID!}
        trackScreenViews={true}
        trackAttributes={true}
        trackOutgoingLinks={true}
      />
    );
  }

  return children;
}
