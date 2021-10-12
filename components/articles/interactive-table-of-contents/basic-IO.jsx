/* eslint-disable */
import React, { useState, useEffect, useRef, MutableRefObject } from "react";

export default function BasicIODemo() {
  const ref = useRef(null);
  let isIntersecting = false;

  isIntersecting = useOnScreen(ref);

  const variants = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
    hidden: { opacity: 0 },
  };
  return (
    <div className="pt-1 pl-2 rounded-lg bg-secondary-lightBg">
      <motion.div className="sticky top-0 left-0" layout>
        <motion.span>Purple</motion.span>{" "}
        <AnimatePresence>
          {!isIntersecting && (
            <motion.span
              layoutId="not"
              initial="hidden"
              animate="visible"
              className="text-primary-300"
              variants={variants}
            >
              in
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span className="inline-block" layoutId="vis">
          visible
        </motion.span>
      </motion.div>
      <div className="rounded-lg overflow-hidden py-2">
        <div className="h-64 overflow-scroll relative">
          <div ref={ref} className="h-72 bg-primary-200 text-center">
            Scroll down &darr;
          </div>
          <div className="h-72 bg-secondary-line text-center">Hello</div>
        </div>
      </div>
    </div>
  );
}

// Hook
function useOnScreen(ref) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      setIntersecting(entry.isIntersecting);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
