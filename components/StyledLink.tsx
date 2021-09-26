import Link from "next/link";
import React from "react";

const StyledLink = ({ children, href }: StyledLinkProps) => (
  <Link href={href} passHref>
    <a className="text-primary-300 text-base font-medium">{children} &rarr;</a>
  </Link>
);
type StyledLinkProps = {
  children: React.ReactText;
  href: string;
};
export default StyledLink;
