import "@/app/globals.css";

import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import { Providers, QueryClientProviders } from "@/app/providers";

import { Grid } from "@chakra-ui/react";

import { ReduxProvider } from "@/redux/Provider";
import MainContent from "@/components/MainContent";

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
        <QueryClientProviders>
          <ReduxProvider>
            <Providers>
              <Grid
                templateColumns={{
                  base: "repeat(9, 1fr)",
                  xl: "repeat(10, 1fr)",
                }}
                // h="full"
                gap={5}
              >
                <MainContent>{children}</MainContent>
              </Grid>
            </Providers>
          </ReduxProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
