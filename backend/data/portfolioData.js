const portfolioData = {
  hero: {
    badge: "MERN Portfolio Starter",
    name: "Alex Morgan",
    role: "Full-Stack Developer",
    summary:
      "I build polished portfolio sites and lightweight apps with React, Node.js, Express, and MongoDB. This starter keeps the structure clean so you can customize it fast."
  },
  stats: [
    { value: "6+", label: "sample sections" },
    { value: "3", label: "stack layers" },
    { value: "100%", label: "responsive layout" },
    { value: "1", label: "contact pipeline" }
  ],
  about: {
    intro:
      "The frontend pulls live content from the backend, and the contact form is wired for MongoDB with an in-memory fallback for local demos.",
    points: [
      "React renders the portfolio and keeps the UI responsive.",
      "Express serves portfolio data and validates contact submissions.",
      "MongoDB stores messages when a database connection is available."
    ]
  },
  skills: [
    {
      title: "Frontend",
      description: "Clear, responsive interfaces with strong layout and spacing.",
      items: ["React", "Vite", "CSS Grid", "Accessibility"],
      accent: "#7dd3fc"
    },
    {
      title: "Backend",
      description: "Small APIs with validation and practical structure.",
      items: ["Node.js", "Express", "REST APIs", "Validation"],
      accent: "#34d399"
    },
    {
      title: "Database",
      description: "Flexible storage for demo data and contact submissions.",
      items: ["MongoDB", "Mongoose", "Schemas", "Fallback storage"],
      accent: "#f59e0b"
    }
  ],
  projects: [
    {
      title: "Portfolio Launchpad",
      category: "Website",
      description:
        "A one-page portfolio layout with a bold hero, skills cards, project cards, and a working contact section.",
      stack: ["React", "CSS", "Express"],
      result: "Simple to customize and ready to present as a personal site.",
      accent: "#7dd3fc"
    },
    {
      title: "Contact Inbox",
      category: "Backend",
      description:
        "A POST route captures messages, validates input, and stores submissions in MongoDB when the database is online.",
      stack: ["Node.js", "MongoDB", "Mongoose"],
      result: "Keeps the contact flow small and easy to extend later.",
      accent: "#f59e0b"
    },
    {
      title: "Responsive Blocks",
      category: "UI System",
      description:
        "Reusable content cards and layout blocks that collapse cleanly on smaller screens.",
      stack: ["Flexbox", "Grid", "Media queries"],
      result: "Looks intentional on desktop and mobile without extra complexity.",
      accent: "#34d399"
    }
  ],
  timeline: [
    {
      year: "01",
      title: "Scaffold the stack",
      description: "Split the project into backend and frontend folders using npm workspaces."
    },
    {
      year: "02",
      title: "Render the portfolio",
      description: "React fetches API content and keeps a fallback copy for instant previews."
    },
    {
      year: "03",
      title: "Capture messages",
      description: "The backend validates input and stores contact submissions when MongoDB is available."
    }
  ],
  contact: {
    email: "hello@yourname.com",
    location: "Remote / Worldwide",
    availability: "Open for freelance, junior, and internship roles."
  }
};

module.exports = portfolioData;
