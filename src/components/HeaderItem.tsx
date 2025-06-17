"use client";

import { motion } from "framer-motion";
import { ComponentType } from "react";

interface HeaderItemProps {
  title: string;
  Icon: ComponentType<{ className?: string }>;
  onClick?: () => void;
}

function HeaderItem({ title, Icon, onClick }: HeaderItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group flex flex-col items-center cursor-pointer w-12 sm:w-20 hover:text-white"
    >
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="tracking-widest text-sm font-medium"
      >
        {title}
      </motion.p>
      <motion.div
        className="h-0.5 w-0 bg-red-500 group-hover:w-full transition-all duration-300"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
      />
    </motion.div>
  );
}

export default HeaderItem;
