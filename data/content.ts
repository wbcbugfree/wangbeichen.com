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
  titles: ["PhD Candidate", "Knowledge Engineer", "Semantic Web Researcher", "AI Enthusiast"],
};

// ─── Research Interests (Skills) ─────────────────────────────
export const skillsData: SkillsData = {
  skills:
    "Knowledge Graphs, Semantic Web, LLMs, NLP, AI Applications, RAG, Agent, Ontologies",
  highlights: ["Knowledge Graphs", "Semantic Web", "LLMs", "RAG"],
};

// ─── About ───────────────────────────────────────────────────
export const aboutData: AboutData = {
  image: "/pic.png",
  imageAlt: "Beichen Wang (王北辰)",
  text: `I am a PhD candidate at Wageningen University & Research, supervised by Prof. Dr. Anna Fensel and Dr. Luís Moreira de Sousa. Currently, I am engaged in the SoilWise Horizon Europe project, where I developed a soil health knowledge graph from unstructured text using large language models (LLMs). I'm also developing a controlled vocabulary dedicated to soil science and a RAG-based chatbot for soil-related question answering. My work combines LLMs and natural language processing with semantic web technologies, such as RDF knowledge graphs, ontologies, and SPARQL, to extract, integrate, and disseminate critical insights on soil health and soil science.`,
  cvUrl: "/cv.pdf",
  education: [
    {
      degree: "Master of Science in Electrical Engineering",
      institution: "Delft University of Technology | Delft, the Netherlands",
      period: "Sep 2021 - Aug 2023",
      description:
        "Track: Wireless Communication and Sensing. Thesis: Linear Clustering Process on Networks.",
    },
    {
      degree: "Bachelor of Engineering in Telecommunication Engineering",
      institution:
        "Beijing University of Posts and Telecommunications | Beijing, China",
      period: "Sep 2016 - Jun 2020",
      description:
        "Thesis: Object Detection in Microscope Images Based on Deep Learning.",
    },
  ],
  experience: [
    {
      role: "PhD Candidate",
      organization: "Wageningen University & Research | Wageningen, the Netherlands",
      period: "Apr 2024 - Mar 2028",
      description:
        "Developing ontology-compliant soil health knowledge graph from unstructured text with LLMs, plus soil science vocabularies and RAG-based agentic chatbot.",
    },
    {
      role: "Natural Language Processing Research Assistant",
      organization: "iFLYTEK | Beijing, China",
      period: "Nov 2020 - Jul 2021",
      description:
        "Worked on machine-reading-comprehension methods for legal factor extraction.",
    },
  ],
  talks: [
    {
      title:
        "Make soil healthy again: Construction of ontology-compliant soil health knowledge graph with large language models",
      event:
        "K-CAP '25: the 13th Knowledge Capture Conference 2025 | Dayton, Ohio, USA",
      date: "Dec 10, 2025",
    },
    {
      title: "Soil health knowledge graph: Current progress, use cases and future work",
      event: "OpenGeoHub | Doorwerth, the Netherlands",
      date: "Aug 21, 2025",
    },
    {
      title:
        "Constructing knowledge graphs from text using LLMs: Current progress, open challenges and future work",
      event:
        "Artificial Intelligence Chair Group | Wageningen University, the Netherlands",
      date: "Dec 2, 2024",
    },
    {
      title: "Soil health knowledge graph: Iteration I",
      event: "SoilWise Annual Meeting | CREA AA, Florence, Italy",
      date: "Oct 29, 2024",
    },
    {
      title: "Linear clustering process on networks",
      event: "Computational Network Science Lab | Leiden University, the Netherlands",
      date: "Sep 28, 2023",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────
export const contactData: ContactEntry[] = [
  {
    type: "Email",
    value: "beichen.wang@wur.nl",
    href: "mailto:beichen.wang@wur.nl",
  },
  {
    type: "GitHub",
    value: "github.com/wbcbugfree",
    href: "https://github.com/wbcbugfree",
  },
  {
    type: "Google Scholar",
    value: "Scholar Profile",
    href: "https://scholar.google.com/citations?user=SiU_-YEAAAAJ",
  },
  {
    type: "LinkedIn",
    value: "linkedin.com/in/beichen-wang",
    href: "https://linkedin.com/in/beichen-wang",
  },
  {
    type: "ORCID",
    value: "0009-0008-5213-5114",
    href: "https://orcid.org/0009-0008-5213-5114",
  },
  {
    type: "ResearchGate",
    value: "researchgate.net/profile/Beichen-Wang-8",
    href: "https://www.researchgate.net/profile/Beichen-Wang-8",
  },
];

// ─── Projects & Demos ────────────────────────────────────────
export const projectCategories: ProjectCategory[] = [
  {
    category: "Projects",
    projects: [
      {
        title: "EU SoilVoc",
        description:
          "A EU-wide SKOS-based thesaurus dedicated to soil science, developed in the SoilWise Horizon Europe project.",
        techStack: ["SKOS", "RDF", "Controlled Vocabularies", "Ontologies"],
        demoUrl: "https://soilvoc.wangbeichen.com",
        registryUrl: "https://w3id.org/eusoilvoc",
        githubUrl: "https://github.com/soilwise-he/soil-vocabs",
      },
    ],
  },
];

// ─── Publications ────────────────────────────────────────────
export const publicationsData: Publication[] = [
  {
    title:
      "Make soil healthy again: Construction of ontology-compliant soil health knowledge graph with large language models",
    authors: ["Beichen Wang", "Luís Moreira de Sousa", "Anna Fensel"],
    venue: "K-CAP 25: the 13th Knowledge Capture Conference 2025",
    year: 2025,
    type: "conference",
    paperUrl: "https://doi.org/10.1145/3731443.3771730",
    pdfUrl:
      "/publications/Wang%20-%202025%20-%20Make%20soil%20healthy%20again%20Construction%20of%20ontology-compliant%20soil%20health%20knowledge%20graph%20with%20large%20l.pdf",
    abstract:
      "Construction of an ontology-compliant soil health knowledge graph from unstructured text using large language models.",
    highlight: true,
    image: "/publications/text2KG.svg",
    codeUrl: "https://github.com/soilwise-he/soil-health-knowledge-graph",
    videoUrl: "https://youtu.be/3D7_ZEPk6kE",
    endpointUrl: "https://sparql.soilwise.wetransform.eu/sparql/",
  },
  {
    title:
      "Linear clustering process on networks: a comparative study",
    authors: ["Ivan Jokić", "Beichen Wang", "Piet Van Mieghem"],
    venue: "Journal of Complex Networks",
    year: 2024,
    type: "journal",
    paperUrl: "https://doi.org/10.1093/comnet/cnae022",
    pdfUrl:
      "/publications/Joki%C4%87%20-%202024%20-%20Linear%20clustering%20process%20on%20networks%20a%20comparative%20study.pdf",
    coverVideo: "/publications/lcp.mp4",
    codeUrl: "https://github.com/wbcbugfree/linear-clustering-process",
  },
  {
    title:
      "Various Legal Factors Extraction Based on Machine Reading Comprehension",
    authors: [
      "Beichen Wang",
      "Ziyue Wang",
      "Baoxin Wang",
      "Dayong Wu",
      "Zhigang Chen",
      "Shijin Wang",
      "Guoping Hu",
    ],
    venue: "Information Retrieval - 27th China Conference, CCIR 2021",
    year: 2021,
    type: "conference",
    paperUrl: "https://doi.org/10.1007/978-3-030-88189-4_2",
    pdfUrl:
      "/publications/Wang%20-%202021%20-%20Various%20Legal%20Factors%20Extraction%20Based%20on%20Machine%20Reading%20Comprehension.pdf",
    image: "/publications/legal.svg",
  },
  {
    title: "Linear Clustering Process on Networks",
    authors: ["Beichen Wang"],
    venue: "Master's thesis, Delft University of Technology",
    year: 2023,
    type: "thesis",
    paperUrl:
      "https://resolver.tudelft.nl/uuid:41dc9ae8-2055-47d1-bb0a-a870cc076cdc",
    pdfUrl: "/publications/MSc_Thesis_Beichen_Wang.pdf",
    image: "/publications/lcp-thesis-cover.png",
    codeUrl: "https://github.com/wbcbugfree/linear-clustering-process",
  },
];
