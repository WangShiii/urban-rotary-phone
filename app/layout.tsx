import { ReactNode } from "react";
import "./tailwind.css";

export const metadata = {
  title: "urban rotary phone",
  description: "my shit hill for web client",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
