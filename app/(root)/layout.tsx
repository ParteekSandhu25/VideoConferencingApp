import { StreamVideoProvider } from "@/providers/StreamClientProvider";

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
