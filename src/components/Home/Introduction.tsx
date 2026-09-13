"use client";
import { motion, stagger, useAnimate } from "motion/react";
import { useThemeMode } from "@/hooks/useThemeMode";
import Image from "next/image";
import IntroductionImage from "../../../public/images/IntroductionImage.jpeg";
import { useEffect, useState, type ReactNode } from "react";
import ResumeButton from "./ResumeButton";
import { DrawCircleText } from "../Miscellaneous/DrawCircleText";

export default function Introduction({ name }: { name: string }) {
  const theme = useThemeMode();
  const [showGlow, setShowGlow] = useState(false);

  const introduction: ReactNode[][] = [
    [
      "Hey!",
      "I'm",
      "an",
      "engineer",
      "who",
      "loves",
      <DrawCircleText key="building" text="building" />,
      "things that don't just work—but feel right.",
    ],
    [
      "Backend, distributed systems, and AI infrastructure excite me.",
      "I believe actions speak louder than words, so I put my code where my mouth is.",
    ],
    [
      "Currently a Research Intern at IIT (BHU), working on mathematical models for Net Zero practices in MSMEs.",
    ],
    [
      "When I'm not coding, I'm usually hacking on side projects or breaking things just to see how they tick.",
    ],
  ];
  const [scope, animate] = useAnimate();
  function introAnimation() {
    animate(
      "span",
      { opacity: 1, filter: "blur(0px)", y: 0 },
      { duration: 0.3, ease: "easeInOut", delay: stagger(0.02) },
    );
  }

  useEffect(() => {
    introAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      setShowGlow(true);
      const timeout = setTimeout(() => setShowGlow(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [theme]);
  return (
    <div className="w-full px-10 flex flex-col space-y-5">
      {/* Introduction */}
      <motion.div className="flex items-center justify-between pt-2 max-[425px]:flex-col max-[425px]:items-center max-[425px]:gap-4">
        {/* Left: Heading and Name/Handle */}
        <div className="flex flex-col gap-1 max-[425px]:order-2 w-full max-[425px]:items-center">
          <motion.h1 className="text-sm smalll mb-1">
            Hey It&apos;s me
          </motion.h1>
          <div className="flex items-center gap-3 max-[425px]:justify-center max-[425px]:w-full">
            <motion.h1
              className={`jap text-4xl ${theme === "dark" ? "demon-red" : ""}`}
            >
              {name}
            </motion.h1>
            <div className="flex items-center">
              <motion.h1 className="text jap text-3xl mr-1">/</motion.h1>
              <motion.h1 className="text smalll text-sm mt-3">
                @ashish
                <span className={` ${theme === "dark" ? "demon-red" : ""}`}>
                  19n
                </span>
              </motion.h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ResumeButton />
            <motion.a
              href="https://x.com/ashish19n"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <motion.span
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-[10px] smalll px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none"
                variants={{
                  hover: { opacity: 1, y: 0 },
                }}
                initial={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
              >
                X
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black dark:border-t-white" />
              </motion.span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 50 50"
                className="fill-current"
              >
                <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
              </svg>
            </motion.a>
            <motion.a
              href="https://github.com/ashishnanda19"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.12 } }}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <motion.span
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black text-[10px] smalll px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none"
                variants={{
                  hover: { opacity: 1, y: 0 },
                }}
                initial={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
              >
                Github
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3px] w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black dark:border-t-white" />
              </motion.span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 98 96"
                className="fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                />
              </svg>
            </motion.a>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex items-center max-[425px]:order-1 max-[425px]:mb-2">
          <div className={`ProfileDoubleBorder${showGlow ? " red-glow" : ""}`}>
            <Image
              src={IntroductionImage}
              alt="Japanese Name Logo"
              width={110}
              height={110}
              className="rounded-[0.55rem] object-cover w-[107px] h-[107px] block"
            />
          </div>
        </div>
      </motion.div>

      {/* testimonial */}
      <div
        ref={scope}
        className="flex flex-col gap-y-2 smalll text-[19px] w-full max-w-full leading-relaxed"
      >
        {introduction.map((line, lineIdx) => (
          <div
            key={`line-${lineIdx}`}
            className="flex flex-wrap gap-x-2 gap-y-1 w-full"
          >
            {line.map((item, itemIdx) =>
              typeof item === "string" ? (
                item
                  .split(/\s+/)
                  .filter((word) => word.length > 0)
                  .map((word, wordIdx) => (
                    <motion.span
                      style={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                      key={`w-${lineIdx}-${itemIdx}-${wordIdx}`}
                    >
                      {word}
                    </motion.span>
                  ))
              ) : (
                <motion.span
                  style={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                  key={`w-${lineIdx}-${itemIdx}`}
                >
                  {item}
                </motion.span>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
