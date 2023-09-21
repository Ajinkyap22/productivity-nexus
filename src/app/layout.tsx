import "@/app/globals.css";

import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import { Providers } from "@/app/providers";

import { ReduxProvider } from "@/redux/Provider";

import Sidebar from "@/components/Sidebar";
import { Grid } from "@chakra-ui/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Productivity Nexus",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <Providers>
            <Grid templateColumns="repeat(10, 1fr)" gap={6}>
              <Sidebar />

              {children}
            </Grid>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}