import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import { useState, useRef } from "react";
const showHideVariants = {
  shown: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const Pre: FunctionComponent = ({ children }) => {
  const textInput = useRef(null);
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <motion.div
      ref={textInput}
      onMouseLeave={() => setCopied(false)}
      className="relative group"
    >
      <motion.button
        variants={showHideVariants}
        aria-label="Copy code"
        type="button"
        className={`group-hover:opacity-100 opacity-0 transition-opacity duration-300
         absolute right-2 top-2 w-9 h-9 p-1 rounded border-2
          bg-secondary-line ${
            copied
              ? "focus:outline-none focus:border-primary-300 border-primary-300"
              : "border-secondary-placholder"
          }`}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className={
            "transition-colors " +
            (copied ? "text-primary-300" : "text-secondary-placeholder")
          }
        >
          <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5H15M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5" />
          <motion.path
            d="M9 14L11 16L15 12"
            animate={copied ? { pathLength: 1 } : {}}
            initial={{ pathLength: 0 }}
            transition={{ ease: "circOut" }}
          />
        </svg>
      </motion.button>

      <pre className="!pl-[1em] bg-secondary-lightBg ">{children}</pre>
    </motion.div>
  );
};

export default Pre;
