import type {
  HeroData,
  SkillsData,
  AboutData,
  ContactEntry,
  ProjectCategory,
  Publication,
} from "./types";

// Re-export types so existing imports keep working.
export type { ContactEntry, Project, ProjectCategory, Publication } from "./types";

// ─── Hero ────────────────────────────────────────────────────
export const heroData: HeroData = {
  greeting: "Hi, I am Beichen Wang",
  titles: ["Soil Scientist", "Knowledge Engineer", "PhD Researcher"],
};

// ─── Research Interests (Skills) ─────────────────────────────
export const skillsData: SkillsData = {
  skills:
    "Knowledge Graphs, Soil Science, Semantic Web, NLP, Ontology Engineering, SKOS, RAG",
  highlights: ["Knowledge Graphs", "Soil Science"],
};

// ─── About ───────────────────────────────────────────────────
export const aboutData: AboutData = {
  image: "/pic.png",
  imageAlt: "Beichen Wang",
  text: `I am a PhD researcher at [University Name] working at the intersection of soil science and artificial intelligence. My research focuses on building knowledge graphs and ontologies for soil science data, enabling semantic interoperability and intelligent retrieval across heterogeneous soil datasets. I am passionate about making soil knowledge more accessible, reusable, and machine-readable.`,
  education: [
    {
      degree: "PhD in Soil Science / Knowledge Engineering",
      institution: "University Name",
      period: "2022 – present",
      description:
        "Developing knowledge graphs and ontologies for soil science data interoperability. Advised by [Supervisor Name].",
    },
    {
      degree: "MSc in [Field]",
      institution: "University Name",
      period: "2019 – 2022",
      description: "Thesis on [topic].",
    },
    {
      degree: "BSc in [Field]",
      institution: "University Name",
      period: "2015 – 2019",
    },
  ],
  experience: [
    {
      role: "Research Assistant",
      organization: "University Name",
      period: "2022 – present",
      description:
        "Building the Soil Health Knowledge Graph and SoilBot RAG system. Maintaining the Soil Vocabulary Browser (Skosmos instance).",
    },
    {
      role: "Teaching Assistant",
      organization: "University Name",
      period: "2023 – present",
      description: "Courses: Introduction to Knowledge Graphs, Semantic Web Technologies.",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────
export const contactData: ContactEntry[] = [
  {
    type: "Email",
    value: "b.wang@university.edu",
    href: "mailto:b.wang@university.edu",
  },
  {
    type: "GitHub",
    value: "github.com/beichenwang",
    href: "https://github.com/beichenwang",
  },
  {
    type: "Google Scholar",
    value: "Scholar Profile",
    href: "https://scholar.google.com/citations?user=PLACEHOLDER",
  },
  {
    type: "LinkedIn",
    value: "linkedin.com/in/beichenwang",
    href: "https://linkedin.com/in/beichenwang",
  },
  {
    type: "ORCID",
    value: "0000-0000-0000-0000",
    href: "https://orcid.org/0000-0000-0000-0000",
  },
];

// ─── Projects & Demos ────────────────────────────────────────
export const projectCategories: ProjectCategory[] = [
  {
    category: "Research Projects",
    projects: [
      {
        title: "Soil Health Knowledge Graph",
        image: "/projects/placeholder.png",
        description:
          "A knowledge graph for soil science that integrates heterogeneous soil datasets using SKOS, OWL, and RDF. Enables semantic querying across soil health indicators and land-use classifications.",
        techStack: ["RDF", "OWL", "SKOS", "SPARQL", "Python"],
        githubUrl: "https://github.com/beichenwang/soil-health-kg",
      },
      {
        title: "Soil Vocabulary Browser",
        image: "/projects/placeholder.png",
        description:
          "A Skosmos-based vocabulary browser for soil science controlled vocabularies. Provides a human-readable interface for exploring SKOS concept schemes used in soil data standards.",
        techStack: ["Skosmos", "SKOS", "PHP", "Docker"],
        demoUrl: "https://vocab.wangbeichen.com",
      },
      {
        title: "SoilBot",
        image: "/projects/placeholder.png",
        description:
          "A knowledge graph–augmented RAG chatbot for soil science. Answers natural language questions about soil health by retrieving context from the Soil Health Knowledge Graph.",
        techStack: ["RAG", "LLM", "SPARQL", "Python", "FastAPI"],
        demoUrl: "https://soilbot.wangbeichen.com",
      },
    ],
  },
];

// ─── Publications ────────────────────────────────────────────
export const publicationsData: Publication[] = [
  {
    title:
      "Towards a Soil Health Knowledge Graph: Semantic Integration of Heterogeneous Soil Datasets",
    authors: ["Beichen Wang", "Jane Doe", "John Smith"],
    venue: "K-CAP 2025: Knowledge Capture Conference",
    year: 2025,
    type: "conference",
    paperUrl: "https://doi.org/10.1145/placeholder",
    codeUrl: "https://github.com/beichenwang/soil-health-kg",
    abstract:
      "We present a knowledge graph framework for integrating heterogeneous soil science datasets using SKOS, OWL, and SPARQL. Our approach enables semantic querying across soil health indicators, land-use classifications, and environmental measurements from multiple national soil monitoring programmes.",
    highlight: true,
  },
  {
    title:
      "SoilBot: A Knowledge Graph–Augmented Retrieval System for Soil Science Question Answering",
    authors: ["Beichen Wang", "Jane Doe"],
    venue: "ISWC 2024: International Semantic Web Conference (Poster)",
    year: 2024,
    type: "conference",
    paperUrl: "https://doi.org/10.1007/placeholder",
    codeUrl: "https://github.com/beichenwang/soilbot",
    abstract:
      "SoilBot is a retrieval-augmented generation system that uses the Soil Health Knowledge Graph as its knowledge base. It translates natural language queries into SPARQL and combines structured retrieval with large language model generation.",
  },
  {
    title:
      "SKOS-based Vocabulary Alignment for Interoperable Soil Classification Systems",
    authors: ["Beichen Wang", "Alice Brown", "John Smith"],
    venue: "Applied Ontology",
    year: 2024,
    type: "journal",
    paperUrl: "https://doi.org/10.3233/placeholder",
  },
];
