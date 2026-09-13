"use client";
import SkillsContainer from "@/components/Skills/SkillsContainer";
import { useThemeMode } from "@/hooks/useThemeMode";
import Cd from "@/components/Miscellaneous/Cd";
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

const Languages = [
  { icon: <Cpp />, name: "C++" },
  { icon: <Java />, name: "Java" },
  { icon: <Python />, name: "Python" },
  { icon: <Javascript />, name: "JavaScript" },
  { icon: <SQL />, name: "SQL" },
];

const Frontend = [
  { icon: <React />, name: "React" },
  { icon: <Tailwind />, name: "Tailwind CSS" },
  { icon: <Html />, name: "HTML" },
];

const Backend = [
  { icon: <Node />, name: "Node.js" },
  { icon: <Express />, name: "Express.js" },
  { icon: <FastAPI />, name: "FastAPI" },
  { name: "REST APIs" },
  { icon: <Flask />, name: "Flask" },
  { icon: <SocketIO />, name: "Socket.IO" },
  { icon: <BullMQ />, name: "BullMQ" },
];

const Databases = [
  { icon: <MongoDB />, name: "MongoDB" },
  { icon: <MySQL />, name: "MySQL" },
  { icon: <Postgres />, name: "PostgreSQL" },
  { icon: <PostGIS />, name: "PostGIS" },
  { icon: <Redis />, name: "Redis" },
  { icon: <ChromaDB />, name: "ChromaDB" },
  { icon: <Qdrant />, name: "Qdrant" },
];

const AI_ML = [
  { icon: <LangChain />, name: "LangChain" },
  { icon: <LangGraph />, name: "LangGraph" },
  { icon: <Groq />, name: "Groq" },
  { icon: <HuggingFace />, name: "Hugging Face" },
  { icon: <NetworkX />, name: "NetworkX" },
  { icon: <Ollama />, name: "Ollama" },
  { icon: <TesseractOCR />, name: "Tesseract OCR" },
  { icon: <NumPy />, name: "NumPy" },
  { icon: <Pandas />, name: "Pandas" },
];

const CloudTools = [
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

const Tech = ({ name }: { name: string }) => {
  return (
    <h2 className="smalll text-lg">
      {"<"} {name} {" />"}
    </h2>
  );
};

const categories = [
  { name: "Languages", skills: Languages },
  { name: "Frontend", skills: Frontend },
  { name: "Backend & APIs", skills: Backend },
  { name: "Databases", skills: Databases },
  { name: "AI/ML & GenAI", skills: AI_ML },
  { name: "Cloud & Tools", skills: CloudTools },
];

export default function SkillsPage() {
  const theme = useThemeMode();
  return (
    <div className=" flex flex-col gap-5 min-h-[70vh]">
      <div>
        <h1 className={`jap text-4xl ${theme === "dark" ? "demon-red" : ""}`}>
          Skills
        </h1>
      </div>

      {categories.map((category) => (
        <div key={category.name} className="flex flex-col gap-2">
          <Tech name={category.name} />
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, index) => (
              <SkillsContainer
                key={index}
                icon={skill.icon}
                name={skill.name}
              />
            ))}
          </div>
        </div>
      ))}

      <Cd />
    </div>
  );
}
