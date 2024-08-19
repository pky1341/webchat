'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@/components/theme-provider";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from "sonner";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="bg-muted">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <ProgressBar
            height="4px"
            color="#2563eb"
            options={{ showSpinner: true }}
            shallowRouting
          />
          {children}
          <Toaster richColors={true} expand={true} closeButton={true} theme="system" invert={true} />
          
        </ThemeProvider>
      </body>
    </html>
  );
}
