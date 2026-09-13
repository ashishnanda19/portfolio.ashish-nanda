import React from "react";
import { motion } from "motion/react";
const SkillsContainer = ({
  icon,
  name,
}: {
  icon?: React.ReactNode;
  name?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="skillsDoubleBorder hover:cursor-pointer"
    >
      <div className="flex justify-center smalll items-center gap-2 rounded-md px-2 text-base py-1 shadow-none">
        <span className="flex items-center justify-center">{icon}</span>
        <span className="flex items-center justify-center pr-0.5">{name}</span>
      </div>
    </motion.div>
  );
};

export default SkillsContainer;
