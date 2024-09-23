import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { getCurrentSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Digger",
  description: "Discover underground songs!",
};

const RootLayout = async ({ children }) => {
  const session = await getCurrentSession();

  return (
    <html lang="en">
      <body>
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