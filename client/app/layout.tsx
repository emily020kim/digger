import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { getCurrentSession } from "@/lib/session";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Digger",
  description: "Discover underground songs!",
};

const RootLayout = async ({ children }) => {
  const session = await getCurrentSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-200`}>
        <main className="flex flex-col w-full h-full">
          <ChakraProvider>
            <Navbar session={session} />
            <div className="flex-grow w-full">
              {children}
            </div>
          </ChakraProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;