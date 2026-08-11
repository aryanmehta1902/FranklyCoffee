import { SiteChrome } from "./SiteChrome";
import { PolaroidCarousel } from "./PolaroidCarousel";

const coffee = [
  ["Espresso", "$3.75"],
  ["Americano", "$3.75"],
  ["Macchiato", "$4"],
  ["Cortado", "$4"],
  ["Cappuccino", "$4.50"],
  ["Latte", "$5"],
  ["Mocha", "$5.75"],
  ["Cup of coffee", "$3.75"],
  ["Refill · here only", "$1.75"],
  ["Single origin", "$6"],
  ["Pour over", "MKT"],
  ["Cold brew", "$5.25"],
];

const notCoffee = [
  ["Chai", "$4.50"],
  ["Matcha latte", "$5"],
  ["Golden milk", "$5"],
  ["Hot chocolate", "$4"],
  ["Tea", "$3.50"],
];

const kids = [
  ["Steamer", "$2.50"],
  ["Hot chocolate", "$2.50"],
];

function MenuList({ items }: { items: string[][] }) {
  return (
    <ul className="menu-list">
      {items.map(([name, price]) => (
        <li key={name}>
          <span>{name}</span>
          <i aria-hidden="true" />
          <strong>{price}</strong>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main>
      <SiteChrome />

      <section className="photo-section hero" id="home" aria-labelledby="hero-title">
        <div className="shade" />
        <div className="hero-card paper-card" data-reveal="up">
          <p className="eyebrow">Small shop · serious coffee</p>
          <h1 id="hero-title">Coffee,<br /><em>frankly.</em></h1>
          <p>Thoughtful beans, bright drinks, and a patio made for staying awhile.</p>
        </div>
        <p className="scroll-note">Scroll for the good stuff <span>↓</span></p>
      </section>

      <section className="photo-section story-section" id="story" aria-labelledby="story-title">
        <div className="parallax-bg story-bg" data-parallax aria-hidden="true">
          <img className="story-bg-sunset" src="/photos/sunset-latte.jpg" alt="" />
          <img className="story-bg-night" src="/photos/night-cafe.jpg" alt="" />
        </div>
        <div className="shade story-shade" />
        <div className="story-layout">
          <article className="story-card paper-card" data-reveal="up">
            <p className="eyebrow">A little backstory</p>
            <h2 id="story-title">Good coffee.<br /><em>A bit of fun.</em></h2>
            <p>
              Frankly began in 2021, when Brandon and Kelly Noffsinger set out to make a tiny café feel big on curiosity. Rather than roast everything themselves, they chose a multi-roaster approach—bringing in standout coffees and letting each one speak for itself.
            </p>
            <p>
              The room is compact, the welcome is easy, and the details matter: a careful pull, a changing shelf of beans, a pastry in the sun. No ceremony required.
            </p>

            <div className="visit-grid">
              <div>
                <span className="visit-label">Visit</span>
                <a href="https://www.google.com/maps/search/?api=1&query=727+1%2F2+W+Colorado+Ave%2C+Colorado+Springs%2C+CO+80905" target="_blank" rel="noreferrer">
                  727½ W Colorado Ave<br />Colorado Springs, CO 80905 <span className="direction-arrow" aria-hidden="true">→&#xFE0E;</span>
                </a>
              </div>
              <div>
                <span className="visit-label">Availability</span>
                <p>Mon–Fri · 6:30–3<br />Sat–Sun · 7–4</p>
              </div>
            </div>
          </article>

          <PolaroidCarousel />
        </div>
      </section>

      <section className="photo-section menu-section" id="menu" aria-labelledby="menu-title">
        <div className="parallax-bg menu-bg" data-parallax aria-hidden="true">
          <img className="menu-bg-patio" src="/photos/patio.jpg" alt="" />
          <img className="menu-bg-cups" src="/photos/sunlit-cups.jpg" alt="" />
        </div>
        <div className="shade menu-shade" />
        <div className="menu-sheet paper-card" data-reveal="up">
          <div className="menu-heading">
            <div>
              <p className="eyebrow">The essentials</p>
              <h2 id="menu-title">Menu</h2>
            </div>
            <p>Made carefully.<br />Served simply.</p>
          </div>

          <div className="menu-grid">
            <div className="menu-column">
              <h3>Coffee</h3>
              <MenuList items={coffee} />
            </div>

            <div className="menu-column">
              <h3>Not coffee</h3>
              <MenuList items={notCoffee} />
              <h3 className="kids-title">Kids</h3>
              <MenuList items={kids} />
            </div>

            <div className="menu-column extras">
              <h3>Make it yours</h3>
              <p className="extra-label">Standard flavors <b>+$0.75</b></p>
              <p>Vanilla, honey, caramel, chocolate, lavender, coconut</p>
              <p className="extra-label">Alternative milks <b>+$0.50</b></p>
              <p>Oat, almond, breve</p>
              <div className="tiny-print">
                <span>Espresso</span>
                <b>blend · decaf</b>
                <span>Batch</span>
                <b>blend · Ecuador</b>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <span>
            © <span className="footer-wordmark">FR<span className="wordmark-lower">a</span>NKLY COFF<span className="wordmark-lower">ee</span></span> · Made with care
          </span>
          <a className="footer-contact-link" href="/contact">Contact</a>
        </footer>
      </section>
    </main>
  );
}
