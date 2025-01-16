import type { Metadata } from "next";
import "./globals.css";
import { Poetsen_One } from "next/font/google";
import { AuthProvider } from "@/context/authContext";

const poetsenOne = Poetsen_One({
  weight: ["400"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Isis Consig",
  description: "O melhor processador de consigna'",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={poetsenOne.className} style={{ color: "red" }}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
