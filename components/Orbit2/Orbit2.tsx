"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { ShinyButton } from "../magicui/shiny-button";
import SectionTitle from "../shared/CustomStyle/SectionTitle/SectionTitle";

// --- Data: team members ---
const people = [
  {
    id: 1,
    name: "jhonkony Tx",
    role: "CEO & Founder",
    email: "hello.uiverse.bd.com",
    profile:
      "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
  },
  {
    id: 2,
    name: "jeason jeme",
    role: "P Founder",
    email: "hello.uiverse.bd@gmail.com",
    profile:
      "https://voluminous-amaranth-qevphnlmnp.edgeone.app/man-9216455_1280.jpg",
  },
  {
    id: 3,
    name: "Marie Curie",
    role: "Memager",
    email: "hello.uiverse.bd@gmail.com",
    profile:
      "https://cdn.pixabay.com/photo/2023/04/03/04/49/woman-7895954_1280.jpg",
  },
  {
    id: 4,
    name: "Taisa mary",
    role: "CEO & Engineer",
    email: "hello.uiverse.bd@gmail.com",
    profile: "https://cdn.pixabay.com/photo/2024/09/15/16/46/ai-generated-9049422_960_720.png",
  },
  {
    id: 5,
    name: "kenny d.t",
    role: "CEO ",
    email: "hello.uiverse.bd@gmail.com",
    profile:
      "https://cdn.pixabay.com/photo/2024/05/29/07/51/ai-generated-8795603_1280.jpg",
  },
  {
    id: 6,
    name: "jonsicy pol",
    role: "Founder",
    email: "hello.uiverse.bd@gmail.com",
    profile:
      "https://cdn.pixabay.com/photo/2021/07/26/13/19/man-6494286_640.jpg",
  },
  {
    id: 7,
    name: "sakiloean tony",
    role: "CEO & Founder",
    email: "hello.uiverse.bd@gmail.com",
    profile:
      "https://cdn.pixabay.com/photo/2020/07/17/22/01/man-5415572_640.jpg",
  },
  {
    id: 8,
    name: "Pettar pm",
    role: "Menager",
    email: "hello.uiverse.bd@gmail.com",
    profile:
      "https://cdn.pixabay.com/photo/2014/11/19/10/52/man-537136_640.jpg",
  },
];

// --- Utility for fallback images ---
const safeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.src = "https://placehold.co/100x100/E0E7FF/4338CA?text=Error";
};

// --- Custom hook for mobile detection ---
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkScreenSize = (): void => setIsMobile(window.innerWidth < breakpoint);
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  
  return isMobile;
};

// --- Main Component ---
export default function OrbitCarousel() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const isMobile = useIsMobile();

  const containerRadius = isMobile ? 130 : 200;
  const profileSize = isMobile ? 60 : 80;
  const containerSize = containerRadius * 2 + 100;

  // Calculate rotation for each profile
  const getRotation = React.useCallback(
    (index: number): number => (index - activeIndex) * (360 / people.length),
    [activeIndex]
  );

  // Navigation
  const next = () => setActiveIndex((i) => (i + 1) % people.length);
  const prev = () => setActiveIndex((i) => (i - 1 + people.length) % people.length);

  const handleProfileClick = React.useCallback((index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  }, [activeIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowLeft') prev();
      else if (event.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-rotation
  React.useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div 
      className="flex flex-col items-center p-4 relative min-h-[400px] bg-black transition-colors duration-300 py-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="text-center relative z-10 mb-10">
        <ShinyButton>Recent Project</ShinyButton>
        <SectionTitle
          heading="Creating Meaningful Digital Experiences"
          subHeading="Each project combines UI/UX design expertise with modern web technologies to deliver engaging, user-friendly solutions that make an impact."
        />
      </div>

      <div
        className="relative flex items-center justify-center"
        style={{ width: containerSize, height: containerSize }}
      >

        {/* Active Person Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={people[activeIndex].id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="z-10 bg-white dark:bg-gray-950 backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-gray-900/50 rounded-xl p-3 md:p-4 w-48 md:w-52 text-center border border-gray-100 dark:border-gray-800"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              src={people[activeIndex].profile}
              alt={people[activeIndex].name}
              onError={safeImage}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto -mt-10 md:-mt-12 border-4 border-white dark:border-black object-cover shadow-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <h2 className="mt-2 text-base md:text-lg font-bold text-gray-800 dark:text-white">
                {people[activeIndex].name}
              </h2>
              <div className="flex items-center justify-center text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                <Briefcase size={12} className="mr-1" /> 
                <span className="truncate">{people[activeIndex].role}</span>
              </div>
              <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                <Mail size={12} className="mr-1" /> 
                <span className="truncate">{people[activeIndex].email}</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-center items-center mt-3 space-x-2"
            >
              <button
                onClick={prev}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-700 dark:text-gray-300" />
              </button>
              <button className="px-4 py-1 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors">
                Connect
              </button>
              <button
                onClick={next}
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight size={16} className="text-gray-700 dark:text-gray-300" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Orbiting Profiles with Counter-Rotation */}
        {people.map((p, i) => {
          const rotation = getRotation(i);
          const isActive = i === activeIndex;
          
          return (
            <motion.div
              key={p.id}
              animate={{
                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 20,
                delay: isActive ? 0 : Math.abs(i - activeIndex) * 0.05
              }}
              style={{
                width: profileSize,
                height: profileSize,
                position: "absolute",
                top: `calc(50% - ${profileSize / 2}px)`,
                left: `calc(50% - ${profileSize / 2}px)`,
                zIndex: isActive ? 20 : 10,
              }}
            >
              {/* Counter-rotation to keep image upright */}
              <motion.div
                animate={{ rotate: -rotation }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="w-full h-full"
              >
                <motion.img
                  src={p.profile}
                  alt={p.name}
                  onError={safeImage}
                  onClick={() => handleProfileClick(i)}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? "border-4 border-indigo-500 dark:border-indigo-400 shadow-lg" 
                      : "border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500"
                  }`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Progress Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {people.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full ${
              index === activeIndex 
                ? "bg-indigo-600 dark:bg-indigo-400" 
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}