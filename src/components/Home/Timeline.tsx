"use client";
import { motion } from "motion/react";

interface TimelineEntry {
  title: string;
  institution: string;
  location: string;
  period: string;
}

const timelineData: TimelineEntry[] = [
  {
    title: "Bachelor of Technology - CSE",
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    period: "Aug' 23 – Present",
  },
  {
    title: "Intermediate",
    institution: "Dayanand Public School",
    location: "Shimla, Himachal Pradesh",
    period: "Apr' 22 – Mar' 23",
  },
  {
    title: "Matriculation",
    institution: "Dayanand Public School",
    location: "Shimla, Himachal Pradesh",
    period: "Apr' 20 – Mar' 21",
  },
];

export default function Timeline() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4 ">
      <motion.h2
        className="jap text-3xl mb-4"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        Timeline
      </motion.h2>

      <div className="relative pl-8">
        {/* Animated vertical line */}
        <motion.div
          className="absolute left-[3px] top-0 w-px bg-border origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ bottom: 0 }}
        />

        <div className="flex flex-col gap-4">
          {timelineData.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: i * 0.15,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* Animated dot */}
              <motion.div
                className="absolute left-[-32px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full border-[1.5px] border-foreground bg-background z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.15 + 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              />

              {/* Card with hover animation */}
              <motion.div
                className="BentoCard !items-start !justify-start !p-3 hover:cursor-pointer"
                whileHover={{ x: 4, scale: 1.01 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="BentoCard-content w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="smalll text-[10px] text-muted-foreground">
                      {entry.period}
                    </span>
                    <span className="smalll text-[10px] text-muted-foreground">
                      {entry.location}
                    </span>
                  </div>
                  <h3 className="smalll text-xs mt-1">{entry.title}</h3>
                  <p className="small-text text-[11px] text-muted-foreground mt-0.5">
                    {entry.institution}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
