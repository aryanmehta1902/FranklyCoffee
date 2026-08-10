"use client";

import { useEffect, useRef, useState } from "react";

const photos = [
  { src: "/photos/pastry.jpg", alt: "A pastry and latte at Frankly Coffee", caption: "something flaky" },
  { src: "/photos/latte.jpg", alt: "A sunlit latte at Frankly Coffee", caption: "stay for the light" },
  { src: "/photos/matcha.jpg", alt: "Matcha with latte art", caption: "green, softly" },
  { src: "/photos/iced-coffee.jpg", alt: "An iced coffee on the café counter", caption: "over ice" },
  { src: "/photos/people.jpg", alt: "Friends gathered outside Frankly Coffee", caption: "good company" },
  { src: "/photos/latte-table.jpg", alt: "A latte resting on a table at Frankly Coffee", caption: "a quiet cup" },
  { src: "/photos/berry-drink.jpg", alt: "A bright berry drink on the patio", caption: "something bright" },
  { src: "/photos/coffee-machine.jpg", alt: "Coffee equipment in the morning light", caption: "behind the bar" },
];

function circularOffset(index: number, active: number) {
  let offset = index - active;
  const halfway = photos.length / 2;
  if (offset > halfway) offset -= photos.length;
  if (offset < -halfway) offset += photos.length;
  return offset;
}

export function PolaroidCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const goTo = (index: number) => {
    setActive((index + photos.length) % photos.length);
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % photos.length), 3200);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return (
    <div
      className="polaroid-carousel"
      aria-label="Frankly Coffee photo carousel"
      data-reveal="right"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        pointerStart.current = null;
        if (distance > 42) goTo(active - 1);
        if (distance < -42) goTo(active + 1);
      }}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      <div className="carousel-viewport">
        {photos.map((photo, index) => {
          const offset = circularOffset(index, active);
          const isActive = index === active;
          const positionClass = isActive ? "is-active" : offset === -1 ? "is-previous" : offset === 1 ? "is-next" : "";

          return (
            <figure
              className={`carousel-polaroid${positionClass ? ` ${positionClass}` : ""}`}
              key={photo.src}
              aria-hidden={!isActive}
            >
              <img src={photo.src} alt={isActive ? photo.alt : ""} draggable="false" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          );
        })}
      </div>
      <span className="sr-only" aria-live="polite">Photo {active + 1} of {photos.length}</span>
    </div>
  );
}
