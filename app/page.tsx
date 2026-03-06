import { Hero } from "@/components/Hero";
import { AboutStory } from "@/components/AboutStory";

export default function Home() {
  return (
    <main className="main-with-nav">
      <Hero />
      <AboutStory />
    </main>
  );
}
