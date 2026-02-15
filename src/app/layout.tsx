import { metadata } from "./metadata";
import "./globals.css";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-transparent text-gray-100 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
