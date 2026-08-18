import type { Metadata } from "next";
import { Montserrat, Raleway } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ctrlZ Informática — Reparación, armado de PC y venta de insumos",
  description:
    "Reparación, armado de PC y venta de periféricos, notebooks y componentes en Lincoln y CABA. Rápido, honesto y sin vueltas.",
  openGraph: {
    title: "ctrlZ Informática",
    description:
      "Reparación, armado de PC y venta de periféricos, notebooks y componentes en Lincoln y CABA.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${raleway.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base font-body text-white">
        {children}
      </body>
    </html>
  );
}
