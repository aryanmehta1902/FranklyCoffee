import type { Metadata } from "next";
import { SiteChrome } from "../SiteChrome";

export const metadata: Metadata = {
  title: "Contact | Frankly Coffee",
  description: "Connect with Frankly Coffee in Colorado Springs.",
};

function InstagramIcon() {
  return (
    <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle className="social-icon-dot" cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6H17V3.8c-.3 0-1.4-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5v3h2.8v8h3.3Z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteChrome page="contact" />
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-shade" aria-hidden="true" />
        <article className="contact-card paper-card" data-reveal="up">
          <p className="eyebrow">Say hello</p>
          <h1 id="contact-title">Let&apos;s keep<br /><em>in touch.</em></h1>
          <p className="contact-intro">
            Questions, coffee thoughts, or just want to see what&apos;s brewing?
            Find Frankly online or give the shop a call.
          </p>

          <div className="contact-actions" aria-label="Frankly Coffee social media">
            <a
              className="social-button social-instagram"
              href="https://www.instagram.com/franklycoffee.co/"
              target="_blank"
              rel="noreferrer"
              aria-label="Frankly Coffee on Instagram"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              className="social-button social-facebook"
              href="https://facebook.com/franklycoffee.co"
              target="_blank"
              rel="noreferrer"
              aria-label="Frankly Coffee on Facebook"
            >
              <FacebookIcon />
              <span className="sr-only">Facebook</span>
            </a>
          </div>

          <a className="phone-link" href="tel:+17199003372">
            <span>Call the shop</span>
            <strong>(719) 900-3372</strong>
          </a>
        </article>
      </section>
    </main>
  );
}
