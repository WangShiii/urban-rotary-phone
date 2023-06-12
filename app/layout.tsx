import "./tailwind.css";

export const metadata = {
  title: "urban rotary phone",
  description: "my shit hill for web client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
