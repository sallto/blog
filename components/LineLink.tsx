import React, { ReactText } from "react";
import Link from "next/link";
import StyledLink from "./StyledLink";
const LineLink = ({ children, href }: LineLinkType) => {
  return (
    <div
      className="before:border-b-1 before:border-secondary-line
   before:flex-1 before:mr-6  flex items-center"
    >
      <StyledLink href={href}>{children}</StyledLink>
    </div>
  );
};
type LineLinkType = {
  children: ReactText;
  href: string;
};
export default LineLink;
