import { StreamVideoProvider } from "@/providers/StreamClientProvider";
export const metadata: Metadata = {
  title: "ZOOM",
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
