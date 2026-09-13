"use client";
import Link from "next/link";
import SkillsContainer from "@/components/Skills/SkillsContainer";
import {
  Cpp,
  Java,
  Python,
  Javascript,
  SQL,
  Html,
  Tailwind,
  React,
  Node,
  Express,
  FastAPI,
  MongoDB,
  Postgres,
  MySQL,
  Redis,
  ChromaDB,
  LangChain,
  LangGraph,
  HuggingFace,
  NumPy,
  Pandas,
  AWS,
  Docker,
  Jenkins,
  CICD,
  Git,
  GitHubSkill,
  Supabase,
  SocketIO,
  BullMQ,
  Flask,
  Qdrant,
  PostGIS,
  Groq,
  NetworkX,
  Ollama,
  TesseractOCR,
  FFmpeg,
  Prometheus,
  Grafana,
  CMake,
} from "@/components/Skills/SkillsLogo";

const allSkills = [
  { icon: <Cpp />, name: "C++" },
  { icon: <Java />, name: "Java" },
  { icon: <Python />, name: "Python" },
  { icon: <Javascript />, name: "JavaScript" },
  { icon: <SQL />, name: "SQL" },
  { icon: <React />, name: "React" },
  { icon: <Tailwind />, name: "Tailwind CSS" },
  { icon: <Html />, name: "HTML" },
  { icon: <Node />, name: "Node.js" },
  { icon: <Express />, name: "Express.js" },
  { icon: <FastAPI />, name: "FastAPI" },
  { name: "REST APIs" },
  { icon: <Flask />, name: "Flask" },
  { icon: <SocketIO />, name: "Socket.IO" },
  { icon: <BullMQ />, name: "BullMQ" },
  { icon: <MongoDB />, name: "MongoDB" },
  { icon: <MySQL />, name: "MySQL" },
  { icon: <Postgres />, name: "PostgreSQL" },
  { icon: <PostGIS />, name: "PostGIS" },
  { icon: <Redis />, name: "Redis" },
  { icon: <ChromaDB />, name: "ChromaDB" },
  { icon: <Qdrant />, name: "Qdrant" },
  { icon: <LangChain />, name: "LangChain" },
  { icon: <LangGraph />, name: "LangGraph" },
  { icon: <Groq />, name: "Groq" },
  { icon: <HuggingFace />, name: "Hugging Face" },
  { icon: <NetworkX />, name: "NetworkX" },
  { icon: <Ollama />, name: "Ollama" },
  { icon: <TesseractOCR />, name: "Tesseract OCR" },
  { icon: <NumPy />, name: "NumPy" },
  { icon: <Pandas />, name: "Pandas" },
  { icon: <AWS />, name: "AWS" },
  { icon: <Docker />, name: "Docker" },
  { icon: <Jenkins />, name: "Jenkins" },
  { icon: <CICD />, name: "CI/CD" },
  { icon: <Git />, name: "Git" },
  { icon: <GitHubSkill />, name: "GitHub" },
  { icon: <Supabase />, name: "Supabase" },
  { icon: <FFmpeg />, name: "FFmpeg" },
  { icon: <Prometheus />, name: "Prometheus" },
  { icon: <Grafana />, name: "Grafana" },
  { icon: <CMake />, name: "CMake" },
];

export default function HomeSkills() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      <Link
        href="/skills"
        className="jap text-3xl mb-4 block hover:opacity-80 transition-opacity"
      >
        Skills
      </Link>
      <div className="flex flex-wrap gap-1.5">
        {allSkills.map((skill, i) => (
          <SkillsContainer key={i} icon={skill.icon} name={skill.name} />
        ))}
      </div>
    </div>
  );
}
