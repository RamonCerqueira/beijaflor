import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import VLibrasWidget from "@/components/VLibrasWidget";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Associação Projeto Beija-Flor da Massaranduba",
  description: "Projeto sócio-educativo e creche-escola em Massaranduba (Salvador - BA) sob a coordenação do Padre Marco Pagliucci. Proporcionamos educação integral, apoio pedagógico e oficinas gratuitas para crianças e jovens.",
  keywords: ["Projeto Beija-Flor", "Massaranduba", "Salvador", "Creche", "Projeto Social", "Padre Marco Pagliucci", "Solidariedade", "Bahia", "Educação Infantil"],
  authors: [{ name: "Associação Projeto Beija-Flor" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://projeto-beijaflor.org",
    title: "Associação Projeto Beija-Flor da Massaranduba",
    description: "Projeto sócio-educativo e creche-escola em Massaranduba (Salvador - BA) proporcionando educação integral, apoio pedagógico e oficinas gratuitas.",
    siteName: "Projeto Beija-Flor",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Logo do Projeto Beija-Flor da Massaranduba",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Associação Projeto Beija-Flor da Massaranduba",
    description: "Projeto sócio-educativo e creche-escola em Massaranduba (Salvador - BA) proporcionando educação integral, apoio pedagógico e oficinas gratuitas.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <TopBar />
        <Navbar />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
        <Footer />
        <AccessibilityToolbar />
        <VLibrasWidget />
      </body>
    </html>
  );
}
