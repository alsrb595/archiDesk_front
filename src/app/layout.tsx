"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import GlobalStyle from "../../styles/GlobalStyles";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const handleComplete = () => setLoading(false);

  //   if (document.readyState === "complete") {
  //     setLoading(false);
  //   } else {
  //     window.addEventListener("load", handleComplete);
  //   }

  //   return () => {
  //     window.removeEventListener("load", handleComplete);
  //   };
  // }, []);

  return (
    <html lang="en">
      <GlobalStyle />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
