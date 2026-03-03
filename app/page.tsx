import { Hero } from "@/components/Hero";
import { GallerySection } from "@/components/GallerySection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />

      <GallerySection />

      <AboutSection />

      <TestimonialsSection />

      <ContactSection />

      <footer className="page-footer mt-auto text-center">
        <div className="layout-wrap">
          © {new Date().getFullYear()} Portrait Photography
        </div>
      </footer>
    </main>
  );
}
