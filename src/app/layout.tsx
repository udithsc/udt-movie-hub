import { metadata } from "./metadata";
import "./globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#06202A] text-gray-300">{children}</body>
    </html>
  );
}
