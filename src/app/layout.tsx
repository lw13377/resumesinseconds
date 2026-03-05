import type { Metadata } from "next";
import {
  Inter, Roboto, Lato, Poppins, Open_Sans, Raleway, Montserrat,
  Playfair_Display, Merriweather, Source_Serif_4,
  Nunito, Cabin, PT_Sans, PT_Serif, Libre_Baskerville,
  Josefin_Sans, Work_Sans, DM_Sans, Rubik, Bitter,
  Crimson_Text, Cormorant_Garamond, EB_Garamond, Mukta, Karla,
} from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto", weight: ["300", "400", "500", "700"] });
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["300", "400", "700"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "500", "600", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-merriweather", weight: ["300", "400", "700"] });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const cabin = Cabin({ subsets: ["latin"], variable: "--font-cabin" });
const ptSans = PT_Sans({ subsets: ["latin"], variable: "--font-pt-sans", weight: ["400", "700"] });
const ptSerif = PT_Serif({ subsets: ["latin"], variable: "--font-pt-serif", weight: ["400", "700"] });
const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], variable: "--font-libre-baskerville", weight: ["400", "700"] });
const josefinSans = Josefin_Sans({ subsets: ["latin"], variable: "--font-josefin-sans" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const bitter = Bitter({ subsets: ["latin"], variable: "--font-bitter" });
const crimsonText = Crimson_Text({ subsets: ["latin"], variable: "--font-crimson-text", weight: ["400", "600", "700"] });
const cormorantGaramond = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-cormorant-garamond", weight: ["300", "400", "500", "600", "700"] });
const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-eb-garamond" });
const mukta = Mukta({ subsets: ["latin"], variable: "--font-mukta", weight: ["300", "400", "500", "700"] });
const karla = Karla({ subsets: ["latin"], variable: "--font-karla" });

export const metadata: Metadata = {
  title: "Resumes in Seconds — Build Professional Resumes Fast",
  description: "Create stunning resumes with 50 professionally designed templates. Customize colors, fonts, and content. Download as PDF.",
  openGraph: {
    title: "Resumes in Seconds — Build Professional Resumes Fast",
    description: "Create stunning resumes with 50 professionally designed templates.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVars = [
    inter, roboto, lato, poppins, openSans, raleway,
    montserrat, playfairDisplay, merriweather, sourceSerif,
    nunito, cabin, ptSans, ptSerif, libreBaskerville,
    josefinSans, workSans, dmSans, rubik, bitter,
    crimsonText, cormorantGaramond, ebGaramond, mukta, karla,
  ].map((f) => f.variable).join(" ");

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${fontVars} font-sans antialiased overflow-x-hidden`}>
        <TooltipProvider>
          {children}
          <Toaster richColors closeButton />
        </TooltipProvider>
      </body>
    </html>
  );
}
