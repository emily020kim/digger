import type { Metadata } from "next";
import { getCurrentSession } from "@/lib/session";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

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
            <Footer />
          </ChakraProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;