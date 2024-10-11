import type { Metadata } from "next";
import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diggr",
  description: "Discover underground songs!",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/doug.svg" />
      </head>
      <body>
        <main className="flex flex-col w-full h-full">
          <ChakraProvider>
            <Navbar />
            <div className="flex-grow w-full">
              {children}
            </div>
            <Footer />
          </ChakraProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;