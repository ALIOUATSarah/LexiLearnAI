import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LexiLearn AI",
  description: "An intelligent learning platform designed for every student",
  metadataBase: new URL("https://younes-lexilearn.vercel.app"),
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "LexiLearn AI",
    description: "An intelligent learning platform designed for every student",
    url: "https://younes-lexilearn.vercel.app",
    siteName: "LexiLearn AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LexiLearn AI",
    description: "An intelligent learning platform designed for every student",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image:alt" content="LexiLearn AI" />
        <meta name="twitter:image:alt" content="LexiLearn AI" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
