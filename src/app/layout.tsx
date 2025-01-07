import type { Metadata } from "next";
import "./globals.css";
import { Poetsen_One } from "next/font/google";

const poetsenOne = Poetsen_One({
  weight: ["400"], 
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "RH-Sistema",
  description: "O melhor gerenciador de Pessoas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={poetsenOne.className} style={{ color: "red" }}>
      <body>
        {children}
      </body>
    </html>
  );
}
