import Link from "next/link";
import React from "react";
import AnimatedArrow from "./AnimatedArrow";

export const ArrowLessLink = ({
  children,
  href,
  ...props
}: StyledLinkProps) => (
  <Link href={href} passHref>
    <a
      {...props}
      className="text-primary-300 font-medium group transition-colors duration-300 hover:text-primary-200"
    >
      {children}
    </a>
  </Link>
);
const StyledLink = ({ children, href }: StyledLinkProps) => (
  <ArrowLessLink href={href}>
    {children} <AnimatedArrow />
  </ArrowLessLink>
);
type StyledLinkProps = {
  children: React.ReactNode;
  href: string;
};
export default StyledLink;
