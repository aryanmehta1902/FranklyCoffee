"use client";

import { useEffect, useState } from "react";

export function SiteChrome({ page = "home" }: { page?: "home" | "contact" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const parallaxItems = document.querySelectorAll<HTMLElement>("[data-parallax]");
    let parallaxFrame = 0;

    const updateParallax = () => {
      if (parallaxFrame || reduceMotion) return;
      parallaxFrame = window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        parallaxItems.forEach((item) => {
          const bounds = item.getBoundingClientRect();
          const itemCenter = bounds.top + bounds.height / 2;
          const offset = Math.max(-20, Math.min(20, (viewportCenter - itemCenter) * 0.035));
          item.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
        });
        parallaxFrame = 0;
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return () => {
        window.removeEventListener("scroll", updateHeader);
        window.removeEventListener("scroll", updateParallax);
        if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -7%" },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("scroll", updateParallax);
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`topbar${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href={page === "contact" ? "/" : "#home"} aria-label="Frankly Coffee home">
        <img src="/logo.png" alt="" />
        <span className="wordmark" aria-label="Frankly Coffee">
          FR<span className="wordmark-lower">a</span>NKLY COFF<span className="wordmark-lower">ee</span>
        </span>
      </a>
      <a className="menu-button" href={page === "contact" ? "/" : "#menu"}>
        {page === "contact" ? "Home" : "Menu"}
      </a>
    </header>
  );
}
