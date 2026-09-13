"use client";

import Image from "next/image";
import { useThemeMode } from "@/hooks/useThemeMode";
import Cd from "@/components/Miscellaneous/Cd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EXPERIENCE, EDUCATION, AWARDS, type TimelineItem } from "@/data/about";

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <AccordionItem
      value={item.title}
      className="BentoCard !items-start !justify-start !p-4 mb-3"
    >
      <AccordionTrigger className="w-full hover:no-underline [&>svg]:hidden group">
        <div className="flex items-center gap-3 w-full">
          <div className="w-10 h-10 shrink-0 rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.title}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              "💼"
            )}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="smalll text-sm font-semibold leading-tight">
              {item.title}
            </div>
            <div className="smalll text-xs text-muted-foreground mt-0.5">
              {item.role}
            </div>
          </div>
          <div className="text-right shrink-0 hidden sm:block">
            <div className="smalll text-xs font-medium">{item.dates}</div>
            <div className="smalll text-[11px] text-muted-foreground">
              {item.location}
            </div>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-13 pt-2">
        {item.metrics && item.metrics.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-4 pt-2">
            {item.metrics.map((m) => (
              <div key={m.label}>
                <p className="smalll text-sm font-bold">{m.value}</p>
                <p className="smalll text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}
        <ul className="space-y-2 mb-3">
          {item.description.map((pt, i) => (
            <li
              key={i}
              className="flex items-start gap-2 smalll text-[13px] text-muted-foreground leading-relaxed"
            >
              <span className="text-muted-foreground/60 mt-[3px] shrink-0">
                •
              </span>
              {pt}
            </li>
          ))}
        </ul>
        {item.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded border border-border bg-muted/20 smalll text-[10px] text-muted-foreground uppercase tracking-widest"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export default function AboutPage() {
  const theme = useThemeMode();

  return (
    <div className="flex flex-col min-h-[70vh] gap-8 px-1">
      <div>
        <h1 className={`jap text-4xl ${theme === "dark" ? "demon-red" : ""}`}>
          About
        </h1>
        <p className="smalll text-sm text-muted-foreground mt-3 max-w-xl leading-relaxed">
          Engineer. I love building, breaking, and shipping things. Backend,
          distributed systems, and AI infrastructure excite me — I believe
          actions speak louder than words, so I put my code where my mouth
          is. Currently a Research Intern at IIT (BHU), open to SWE roles
          starting 2027.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="smalll text-lg">{"<"} Experience {" />"}</h2>
        <Accordion type="single" collapsible className="w-full">
          {EXPERIENCE.map((item, i) => (
            <TimelineCard key={i} item={item} />
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="smalll text-lg">{"<"} Education {" />"}</h2>
        <Accordion type="single" collapsible className="w-full">
          {EDUCATION.map((item, i) => (
            <TimelineCard key={i} item={item} />
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="smalll text-lg">{"<"} Awards {" />"}</h2>
        <div className="BentoCard !items-start !justify-start !p-4">
          <div className="flex flex-col w-full">
            {AWARDS.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <span className="smalll text-[13px] text-muted-foreground">
                  {a.text}
                </span>
                <span className="smalll text-[9px] px-2 py-0.5 rounded border border-green-500/30 text-green-500/80 bg-green-500/5 shrink-0 ml-3">
                  {a.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Cd />
    </div>
  );
}
