import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Heading } from "../../util/types/TOCHeading";

export default function TOCEntry({
  heading,
  isVisible,
}: {
  heading: Heading;
  isVisible: boolean;
}) {
  return (
    <li
      className={
        "pl-4 relative group " +
        (isVisible
          ? "text-primary-300 hover:text-primary-200 transition-colors duration-500"
          : "transition-colors hover:text-secondary-heading duration-500")
      }
    >
      {isVisible ? (
        <motion.div
          layoutId="active"
          className="absolute left-0 bottom-0 top-0 transition-colors duration-500 border-1 border-primary-300 group-hover:border-primary-200"
        />
      ) : null}
      <Link passHref href={heading.url}>
        <a>{heading.value}</a>
      </Link>
    </li>
  );
}
