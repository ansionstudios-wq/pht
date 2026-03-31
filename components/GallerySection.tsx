"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PortraitModal, type PortraitModalItem } from "@/components/PortraitModal";

const GALLERY_ITEMS: {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}[] = [
  {
    src: "/assets/gallery/gal-01.jpg",
    alt: "Gallery portrait 1",
    title: "Gallery Portrait I",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-02.jpeg",
    alt: "Gallery portrait 2",
    title: "Gallery Portrait II",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-03.jpg",
    alt: "Gallery portrait 3",
    title: "Gallery Portrait III",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-04.jpeg",
    alt: "Gallery portrait 4",
    title: "Gallery Portrait IV",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-05.JPG",
    alt: "Gallery portrait 5",
    title: "Gallery Portrait V",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-06.JPG",
    alt: "Gallery portrait 6",
    title: "Gallery Portrait VI",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-07.JPG",
    alt: "Gallery portrait 7",
    title: "Gallery Portrait VII",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-08.JPG",
    alt: "Gallery portrait 8",
    title: "Gallery Portrait VIII",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
  },
  {
    src: "/assets/gallery/gal-09.JPG",
    alt: "Gallery portrait 9",
    title: "Gallery Portrait IX",
    description: "A portrait from the personal gallery collection.",
    category: "Portrait",
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
            quality={95}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="gallery-card-overlay" aria-hidden />
      </div>
    </article>
  );
}

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
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

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className={`gallery-section ${visible ? "gallery-section--visible" : ""}`}
    >
      <header className="gallery-header">
        <h2 className="gallery-heading">The Gallery of Faces</h2>
        <div className="gallery-divider" aria-hidden />
      </header>

      <div className="gallery-masonry">
        {GALLERY_ITEMS.map((item, i) => (
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
