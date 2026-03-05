import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/landing/hero";
import { TemplatePreview } from "@/components/landing/template-preview";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen scroll-smooth overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TemplatePreview />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
