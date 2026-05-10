import { useEffect, useState } from "react";

const fallbackPortfolio = {
  hero: {
    badge: "MERN Portfolio Starter",
    name: "Alex Morgan",
    role: "Full-Stack Developer",
    summary:
      "I build polished portfolio sites and lightweight apps with React, Node.js, Express, and MongoDB. This starter keeps the structure clean so you can customize it fast.",
  },
  stats: [
    { value: "6+", label: "sample sections" },
    { value: "3", label: "stack layers" },
    { value: "100%", label: "responsive layout" },
    { value: "1", label: "contact pipeline" },
  ],
  about: {
    intro:
      "The frontend pulls live content from the backend, and the contact form is wired for MongoDB with an in-memory fallback for local demos.",
    points: [
      "React renders the portfolio and keeps the UI responsive.",
      "Express serves portfolio data and validates contact submissions.",
      "MongoDB stores messages when a database connection is available.",
    ],
  },
  skills: [
    {
      title: "Frontend",
      description:
        "Clear, responsive interfaces with strong layout and spacing.",
      items: ["React", "Vite", "CSS Grid", "Accessibility"],
      accent: "#7dd3fc",
    },
    {
      title: "Backend",
      description: "Small APIs with validation and practical structure.",
      items: ["Node.js", "Express", "REST APIs", "Validation"],
      accent: "#34d399",
    },
    {
      title: "Database",
      description: "Flexible storage for demo data and contact submissions.",
      items: ["MongoDB", "Mongoose", "Schemas", "Fallback storage"],
      accent: "#f59e0b",
    },
  ],
  projects: [
    {
      title: "Portfolio Launchpad",
      category: "Website",
      description:
        "A one-page portfolio layout with a bold hero, skills cards, project cards, and a working contact section.",
      stack: ["React", "CSS", "Express"],
      result: "Simple to customize and ready to present as a personal site.",
      accent: "#7dd3fc",
    },
    {
      title: "Contact Inbox",
      category: "Backend",
      description:
        "A POST route captures messages, validates input, and stores submissions in MongoDB when the database is online.",
      stack: ["Node.js", "MongoDB", "Mongoose"],
      result: "Keeps the contact flow small and easy to extend later.",
      accent: "#f59e0b",
    },
    {
      title: "Responsive Blocks",
      category: "UI System",
      description:
        "Reusable content cards and layout blocks that collapse cleanly on smaller screens.",
      stack: ["Flexbox", "Grid", "Media queries"],
      result:
        "Looks intentional on desktop and mobile without extra complexity.",
      accent: "#34d399",
    },
  ],
  timeline: [
    {
      year: "01",
      title: "Scaffold the stack",
      description:
        "Split the project into backend and frontend folders using npm workspaces.",
    },
    {
      year: "02",
      title: "Render the portfolio",
      description:
        "React fetches API content and keeps a fallback copy for instant previews.",
    },
    {
      year: "03",
      title: "Capture messages",
      description:
        "Tt and stores contact submissions when MongoDB is available.",
    },
  ],
  contact: {
    email: "hello@yourname.com",
    location: "Remote / Worldwide",
    availability: "Open for freelance, junior, and internship roles.",
  },
};

const apiBase = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const apiUrl = (path) => (apiBase ? `${apiBase}${path}` : path);

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-heading__text">{text}</p>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <article className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function SkillCard({ skill }) {
  return (
    <article className="skill-card" style={{ "--card-accent": skill.accent }}>
      <p className="skill-card__title">{skill.title}</p>
      <p className="skill-card__text">{skill.description}</p>
      <div className="chip-row">
        {skill.items.map((item) => (
          <span className="chip" key={item}>
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      className="project-card"
      style={{ "--card-accent": project.accent }}
    >
      <div className="project-card__topline">
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__index">
          {project.stack.length} tools
        </span>
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="chip-row">
        {project.stack.map((item) => (
          <span className="chip chip--soft" key={item}>
            {item}
          </span>
        ))}
      </div>
      <p className="project-card__result">{project.result}</p>
    </article>
  );
}

function TimelineItem({ item }) {
  return (
    <li className="timeline-item">
      <span className="timeline-item__year">{item.year}</span>
      <div className="timeline-item__body">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </li>
  );
}

function App() {
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [dataSource, setDataSource] = useState("Using local preview data.");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formState, setFormState] = useState({
    type: "",
    text: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadPortfolio() {
      try {
        const response = await fetch(apiUrl("/api/portfolio"), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Portfolio endpoint returned an error.");
        }

        const data = await response.json();
        setPortfolio(data);
        setDataSource("Live data from the Express API.");
      } catch (error) {
        if (error.name !== "AbortError") {
          setDataSource(
            "Local preview data. Start the backend for live content.",
          );
        }
      }
    }

    loadPortfolio();

    return () => controller.abort();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({
      type: "info",
      text: "Sending your message...",
    });

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setForm({
        name: "",
        email: "",
        message: "",
      });
      setFormState({
        type: "success",
        text: result.message || "Your message was sent.",
      });
    } catch (error) {
      setFormState({
        type: "error",
        text: error.message || "Could end the message.",
      });
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar__inner">
          <a
            className="brand"
            href="#home"
            aria-label="MERN Portfolio Starter home"
          >
            <span className="brand__mark" />
            Porto Test
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Project</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="home">
        <section className="hero container">
          <div className="hero__copy">
            <p className="eyebrow">{portfolio.hero.badge}</p>
            <h1>{portfolio.hero.name}</h1>
            <h2>{portfolio.hero.role}</h2>
            <p className="hero__summary">{portfolio.hero.summary}</p>

            <div className="hero__actions">
              <a className="button button--primary" href="#projects">
                See Projects
              </a>
              <a className="button button--ghost" href="#contact">
                Contact Me
              </a>
            </div>

            <p className="hero__status">{dataSource}</p>
          </div>

          <aside className="hero__panel" aria-label="Profile summary">
            <div className="info-card">
              <span className="info-card__label">Focus</span>
              <p>
                Clean builds, clear storytelling, and reliable API connections.
              </p>
            </div>
            <div className="info-card info-card--accent">
              <span className="info-card__label">Contact</span>
              <p>{portfolio.contact.email}</p>
              <p>{portfolio.contact.location}</p>
            </div>
            <div className="info-card info-card--muted">
              <span className="info-card__label">Availability</span>
              <p>{portfolio.contact.availability}</p>
            </div>
          </aside>
        </section>

        <section className="container stat-grid" aria-label="Quick stats">
          {portfolio.stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </section>

        <section id="about" className="section container">
          <SectionHeading
            eyebrow="About"
            title="A simple stack with a clear split"
            text={portfolio.about.intro}
          />

          <div className="section-grid">
            <article className="panel">
              <h3>What this starter gives you</h3>
              <ul className="bullet-list">
                {portfolio.about.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>

            <article className="panel panel--gradient">
              <h3>Build flow</h3>
              <ol className="timeline-list">
                {portfolio.timeline.map((item) => (
                  <TimelineItem key={item.year} item={item} />
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section id="skills" className="section container">
          <SectionHeading
            eyebrow="Skills"
            title="Three layers of the MERN stack"
            text="Each card shows a layer you can extend later without rebuilding the layout."
          />

          <div className="card-grid">
            {portfolio.skills.map((skill) => (
              <SkillCard key={skill.title} skill={skill} />
            ))}
          </div>
        </section>

        <section id="projects" className="section container">
          <SectionHeading
            eyebrow="Projects"
            title="Portfolio-style sample work"
            text="These cards show how the page can highlight both frontend presentation and backend logic."
          />

          <div className="card-grid card-grid--projects">
            {portfolio.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section id="contact" className="section container section--contact">
          <SectionHeading
            eyebrow="Contact"
            title="Send a message through the backend"
            text="The form posts to Express, and the backend stores the message in MongoDB when a connection is available."
          />

          <div className="contact-grid">
            <article className="panel">
              <h3>Contact details</h3>
              <p className="panel__intro">
                Reach out if you want a cleaner version, extra pages, or a real
                database-backed inbox.
              </p>
              <div className="contact-pairs">
                <div>
                  <span>Email</span>
                  <strong>{portfolio.contact.email}</strong>
                </div>
                <div>
                  <span>Location</span>
                  <strong>{portfolio.contact.location}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{portfolio.contact.availability}</strong>
                </div>
              </div>
            </article>

            <form className="panel form-panel" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                className="button button--primary button--full"
                type="submit"
              >
                Send Message
              </button>

              {formState.text ? (
                <p
                  className={`form-status form-status--${formState.type}`}
                  role="status"
                >
                  {formState.text}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>Built as a simple MERN starter for a portfolio-style site.</p>
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
