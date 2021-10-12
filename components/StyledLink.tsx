import Link from "next/link";
import React from "react";
import AnimatedArrow from "./AnimatedArrow";

export const ArrowLessLink = React.forwardRef<HTMLLinkElement, StyledLinkProps>(
  ({ children, href = "" }) => (
    <Link href={href} passHref>
      <a className="text-primary-300 font-medium group transition-colors duration-300 hover:text-primary-200">
        {children}
      </a>
    </Link>
  )
);
ArrowLessLink.displayName = "ArrowLessLink";
export default function StyledLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <ArrowLessLink href={href}>
      {children} <AnimatedArrow />
    </ArrowLessLink>
  );
}
type StyledLinkProps = React.DetailedHTMLProps<
  React.LinkHTMLAttributes<HTMLLinkElement>,
  HTMLLinkElement
>;
