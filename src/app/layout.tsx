import "./globals.css";
import type { Metadata } from "next";

import { neu, lombok, cath, jap, playfair, instrument } from "@/lib/font";

import { ThemeProvider } from "@/providers/ThemeProvider";
import ApolloClientProvider from "@/providers/ApolloClientProvider";
import SideScroller from "@/components/Miscellaneous/SideScroller";

export const metadata: Metadata = {
  title: "Ashish Nanda — Software Engineer",
  description:
    "Ashish Nanda — Software engineer building scalable systems. CS @ Manipal University Jaipur '27, Research Intern @ IIT (BHU).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neu.variable} ${lombok.variable} ${cath.variable} ${jap.variable} ${playfair.variable} ${instrument.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloClientProvider>
            <SideScroller />
            {children}
          </ApolloClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
