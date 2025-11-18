export type Experience = {
  title: string;
  details: string;
  image: string;
};

export type Role = {
  role: "Software Engineer" | "Product Manager" | "Graduate Researcher";
  intro: string;
  experiences: Experience[];
};

export const roles: Role[] = [
  {
    role: "Software Engineer",
    intro:
      "I am a Software Engineer. I’m not a nerd software engineer, communication and creativity is playing a huge role in project, of course and the AI.",
    experiences: [
      {
        title: "Shipped AI-powered features from prototype to production.",
        details:
          "Led the end-to-end implementation of AI-assisted features, collaborating closely with designers and product managers to scope requirements, iterate on UX, and ship stable releases.",
        image: "/assets/se1.png"
      },
      {
        title: "Built high-quality frontend systems with React and Next.js.",
        details:
          "Implemented accessible, responsive interfaces with modern React patterns, type-safe APIs, and a strong focus on maintainability and performance.",
        image: "/assets/se2.png"
      },
      {
        title: "Collaborated across disciplines to deliver complex projects.",
        details:
          "Worked side-by-side with hardware, design, and operations teams to align technical decisions with real-world constraints and user needs.",
        image: "/assets/se3.png"
      }
    ]
  },
  {
    role: "Product Manager",
    intro:
      "I am a Product Manager. I’m a passionate product designer, aiming for the ultimate user’s interaction in both software and hardware.",
    experiences: [
      {
        title: "Defined product vision grounded in real user stories.",
        details:
          "Interviewed users, synthesized insights, and translated them into clear product narratives and roadmaps that teams could rally behind.",
        image: "/assets/pm1.png"
      },
      {
        title: "Crafted intuitive experiences from sketch to shipped product.",
        details:
          "Facilitated design workshops, created low-to-high fidelity prototypes, and validated flows with quick feedback loops before committing to builds.",
        image: "/assets/pm2.png"
      },
      {
        title: "Balanced hardware constraints with delightful UX.",
        details:
          "Collaborated with engineering to design interactions that respected physical limitations while still feeling smooth, thoughtful, and joyful.",
        image: "/assets/pm3.png"
      }
    ]
  },
  {
    role: "Graduate Researcher",
    intro:
      "I am a Graduate Researcher. I’m a serious researcher, strict experiments and data analysis verify/show us the very core behind the surface.",
    experiences: [
      {
        title: "Designed rigorous experiments with clear hypotheses.",
        details:
          "Set up controlled experiments with carefully chosen variables, ensuring that every result could be traced back to a well-defined question.",
        image: "/assets/gr1.png"
      },
      {
        title: "Analyzed complex datasets to uncover subtle patterns.",
        details:
          "Applied statistical methods and data visualization to move from raw measurements to meaningful, defensible insights.",
        image: "/assets/gr2.png"
      },
      {
        title: "Communicated findings with clarity and precision.",
        details:
          "Prepared papers, presentations, and diagrams that made intricate technical work understandable for both experts and non-experts.",
        image: "/assets/gr3.png"
      }
    ]
  }
];


