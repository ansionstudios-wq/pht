"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PortraitModal, type PortraitModalItem } from "@/components/PortraitModal";

const CATEGORIES = ["All", "Classic", "Light", "Fine Art", "Ethereal"] as const;
type Category = (typeof CATEGORIES)[number];

const GALLERY_ITEMS: {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
}[] = [
  {
    src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    alt: "Portrait in soft light",
    title: "Amber Light",
    description: "A moment captured in the gentle embrace of afternoon light, as if time itself had paused to rest.",
    category: "Light",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
    alt: "Portrait study",
    title: "Silent Hour",
    description: "In the quiet between dawn and day, the soul finds its reflection in stillness.",
    category: "Classic",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    alt: "Portrait",
    title: "The Gaze",
    description: "Eyes that have witnessed seasons and stories, holding the weight of memory and grace.",
    category: "Classic",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    alt: "Portrait in natural light",
    title: "Golden Hour",
    description: "When the sun leans low and the world is dipped in honey, the ordinary becomes sacred.",
    category: "Light",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    alt: "Portrait",
    title: "Ethereal",
    description: "Floating between shadow and light, a presence that seems to belong to another realm.",
    category: "Ethereal",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    alt: "Portrait study",
    title: "Stillness",
    description: "As in the oldest manuscripts, where a single figure holds the silence of centuries.",
    category: "Fine Art",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    alt: "Portrait",
    title: "Shadow & Light",
    description: "Two companions that have danced across faces since the first dawn was painted.",
    category: "Light",
  },
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    alt: "Portrait in warm tone",
    title: "Warmth",
    description: "A study in the tones of earth and amber, as recorded in the old ateliers.",
    category: "Fine Art",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    alt: "Portrait",
    title: "Timeless",
    description: "Neither past nor future; a face that could belong to any age, preserved in light.",
    category: "Classic",
  },
];

function GalleryCard({
  item,
  index,
  onSelect,
}: {
  item: (typeof GALLERY_ITEMS)[number];
  index: number;
  onSelect: () => void;
}) {
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <article
      ref={ref}
      key={`${item.title}-${index}`}
      className={`gallery-card ${entered ? "gallery-card--visible" : ""}`}
    >
      <div className="gallery-card-frame" onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onSelect()} aria-label={`View ${item.title}`}>
        <div className="gallery-card-image-wrap">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="gallery-card-image"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="gallery-card-overlay" aria-hidden />
        <p className="gallery-card-title">{item.title}</p>
      </div>
    </article>
  );
}

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedItem, setSelectedItem] = useState<PortraitModalItem | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`gallery-section ${visible ? "gallery-section--visible" : ""}`}
    >
      <header className="gallery-header">
        <h2 className="gallery-heading">The Gallery of Faces</h2>
        <div className="gallery-divider" aria-hidden />
        <div className="gallery-filters" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`gallery-filter-btn ${activeCategory === cat ? "gallery-filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="gallery-masonry">
        {filteredItems.map((item, i) => (
          <GalleryCard
            key={`${item.title}-${item.category}-${i}`}
            item={item}
            index={i}
            onSelect={() => setSelectedItem({ src: item.src, alt: item.alt, title: item.title, description: item.description })}
          />
        ))}
      </div>

      <PortraitModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
