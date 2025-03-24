import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "LexiLearn AI",
  description: "An intelligent learning platform designed for every student",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
