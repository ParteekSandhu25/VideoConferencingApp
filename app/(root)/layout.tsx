import { StreamVideoProvider } from "@/providers/StreamClientProvider";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "YOOM",
  description: "Video & Audio calling app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </section>
  );
}
