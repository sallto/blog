import Link from "next/link";
import React from "react";
import AnimatedArrow from "./AnimatedArrow";

const StyledLink = ({ children, href }: StyledLinkProps) => (
  <Link href={href} passHref>
    <a className="text-primary-300 text-base font-medium group">
      {children} <AnimatedArrow />
    </a>
  </Link>
);
type StyledLinkProps = {
  children: React.ReactText;
  href: string;
};
export default StyledLink;
