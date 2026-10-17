import { SKILLS } from "@/components/Work/skills";

export interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  link?: string;
  stack: string[];
}

export const Projects: Project[] = [
  {
    title: "Distributed Video Transcoder",
    description:
      "Infinite-scale distributed video transcoding pipeline with AWS-based queuing, multi-resolution output, and secure streaming architecture.",
    image: "/images/projects/video-transcoder.jpeg",
    github: "https://github.com/ashishnanda19/video-transcoder",
    link: "https://vidflow-transcoder.vercel.app/",
    stack: [
      SKILLS.NodeJS,
      "AWS",
      "Redis",
      SKILLS.MongoDB,
      SKILLS.Docker,
    ],
  },
  {
    title: "SafeTrail",
    description:
      "Cross-platform SOS platform with real-time location tracking, ML-based threat analysis, and emergency response.",
    image: "/images/projects/safetrail.png",
    github: "https://github.com/ashishnanda19/Safe_Trail",
    link: "https://safetrail-app.vercel.app/",
    stack: [
      SKILLS.NodeJS,
      "Socket.io",
      SKILLS.PostgreSQL,
      "Redis",
    ],
  },
  {
    title: "HyperRAG-X",
    description:
      "Enterprise-grade hybrid RAG platform with multi-agent orchestration and tripartite storage, powered by Groq + LLaMA.",
    image: "/images/projects/hyperrag-x.jpg",
    github: "https://github.com/ashishnanda19/HyperRAG-X",
    stack: [
      SKILLS.Python,
      "FastAPI",
      "LangGraph",
      "Qdrant",
    ],
  },
  {
    title: "Prism",
    description:
      "Splits an opaque packet stream into its components — flows, applications, and verdicts — the way a glass prism splits light. A multithreaded C++ engine with TLS fingerprinting and Prometheus/Grafana observability.",
    image: "/images/projects/prism.png",
    github: "https://github.com/ashishnanda19/Prism",
    stack: [SKILLS.CPP, "CMake", SKILLS.Python, SKILLS.Docker, SKILLS.HTML],
  },
  {
    title: "InvoSync",
    description:
      "AI-powered B2B SaaS automating invoice-to-receipt matching with 98%+ accuracy via OCR and fuzzy-matching.",
    image: "/images/projects/invosync.png",
    github: "https://github.com/ashishnanda19/InvoSync",
    stack: [
      SKILLS.React,
      "Flask",
      SKILLS.Python,
      "OCR",
    ],
  },
  {
    title: "VectorForge",
    description:
      "A fully working vector database built from scratch in C++, comparing HNSW, KD-Tree, and brute-force search side-by-side, with a RAG pipeline powered by a local LLM via Ollama.",
    image: "/images/projects/vectorforge.png",
    github: "https://github.com/ashishnanda19/VectorForge",
    stack: [SKILLS.CPP, "HNSW", "RAG", "Ollama"],
  },
];
