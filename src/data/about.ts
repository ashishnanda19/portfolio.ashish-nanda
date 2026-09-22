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
    title: "Shipd (YC W24)",
    role: "ML Analyst",
    dates: "Sep 2026 — Present",
    location: "San Francisco Bay Area · Remote",
    image: "/images/logos/shipd.png",
    description: ["ML @Shipd (Datacurve.ai YC W24)"],
    tech: ["Machine Learning", "Python", "Data Analysis", "AI Infrastructure"],
    metrics: [
      { label: "Role", value: "ML" },
      { label: "Type", value: "Part-time" },
      { label: "Cohort", value: "YC W24" },
      { label: "Status", value: "Present" },
    ],
  },
  {
    title: "Indian Institute of Technology (BHU)",
    role: "Research Intern",
    dates: "Dec 2025 — May 2026",
    location: "Varanasi, Uttar Pradesh",
    image: "/images/logos/iit-bhu.svg",
    description: [
      "PI: Prof. Gaurav Upadhyay and Prof. Cherian Samuel — Mathematical Model for Integrating Net Zero Practices in MSMEs.",
      "Developed a MILP optimization model in Gurobi for a 4-tier, 20+ node MSME supply chain, achieving 5.1% lower cost and 33% lower CO2 through optimized production, energy, transport, and technology decisions.",
      "Modeled 6+ green technologies across 3 MSME categories, integrating government subsidies to identify cost-effective technology adoption and scalable decarbonization strategies.",
    ],
    tech: [
      "Machine Learning",
      "Linear Programming",
      "Gurobi",
      "Optimization",
      "Mathematical Modeling",
      "Sustainability",
    ],
    metrics: [
      { label: "Cost", value: "-5.1%" },
      { label: "CO2", value: "-33%" },
      { label: "Supply Chain", value: "20+ Nodes" },
      { label: "Greentech", value: "6+ Models" },
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
    description: ["CGPA: 9.12 / 10"],
    tech: [],
  },
];

export const AWARDS = [
  { text: "Finalist — International Innovation Challenge (IIC)", badge: "IIC" },
  { text: "National Semifinalist — Flipkart GRiD 7.0", badge: "GRID" },
  { text: "4× Dean's List of Excellence at Manipal University Jaipur", badge: "4×" },
  { text: "LeetCode — 750+ solved · Peak 1,832 rating (Top 6.68% globally)", badge: "LC" },
  { text: "CodeForces — Pupil · Max rating 1,210", badge: "CF" },
  { text: "CodeChef — 3 Star · Max rating 1,600", badge: "CC" }
];
