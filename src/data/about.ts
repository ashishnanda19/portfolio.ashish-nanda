export interface TimelineItem {
  title: string;
  role: string;
  dates: string;
  location: string;
  image?: string;
  description: string[];
  tech: string[];
  metrics?: { label: string; value: string }[];
}

export const EXPERIENCE: TimelineItem[] = [
  {
    title: "Indian Institute of Technology (BHU)",
    role: "Research Intern",
    dates: "Dec 2025 — Present",
    location: "Remote",
    image: "/images/logos/iit-bhu.svg",
    description: [
      "Developing a mathematical model for integrating Net Zero practices in MSMEs to support sustainable development goals.",
      "Building data pipelines and analytical frameworks for sustainability metrics.",
      "Conducting literature reviews and writing academic research documentation.",
    ],
    tech: ["Research", "Mathematical Modeling", "Sustainability", "Data Analysis"],
    metrics: [
      { label: "Scope", value: "MSME" },
      { label: "Goal", value: "Net Zero" },
      { label: "Status", value: "Ongoing" },
      { label: "Type", value: "Research" },
    ],
  },
  {
    title: "Google Developer Groups",
    role: "Technical Member",
    dates: "Sept 2023 — Oct 2025",
    location: "Jaipur, IN",
    image: "/images/logos/gdg.png",
    description: [
      "Organized technical workshops, hackathons, and coding sessions for the developer community.",
      "Led hands-on sessions on web development and cloud technologies.",
      "Mentored junior developers and helped grow the local tech ecosystem.",
    ],
    tech: ["Community", "Mentoring", "Web Dev", "Cloud", "Workshops"],
    metrics: [
      { label: "Duration", value: "2 yrs" },
      { label: "Events", value: "10+" },
      { label: "Type", value: "Tech Lead" },
      { label: "Reach", value: "City" },
    ],
  },
];

export const EDUCATION: TimelineItem[] = [
  {
    title: "Manipal University Jaipur",
    role: "B.Tech in Computer Science",
    dates: "2023 — 2027",
    location: "Jaipur, IN",
    image: "/images/logos/muj.png",
    description: ["CGPA: 9.22 / 10"],
    tech: [],
  },
];

export const AWARDS = [
  { text: "Finalist — International Innovation Challenge (IIC)", badge: "IIC" },
  { text: "National Semifinalist — Flipkart GRiD 7.0", badge: "GRID" },
  { text: "5× Dean's List of Excellence at Manipal University Jaipur", badge: "5×" },
  { text: "LeetCode — 600+ solved · Peak 1,808 rating (Top 7.71% globally)", badge: "LC" },
  { text: "CodeChef — 2 Star · Max rating 1,540", badge: "CC" },
];
