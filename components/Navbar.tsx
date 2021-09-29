import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

function NavItem({ href, children }: ItemProps) {
  return (
    <Link href={href} passHref>
      <a className="transition-colors duration-300 hover:text-secondary-heading">
        {children}
      </a>
    </Link>
  );
}
type ItemProps = {
  href: string;
  children: React.ReactNode;
};

export default function Navbar() {
  return (
    <header className="sticky left-0 right-0 h-16 max-w-prose mx-auto flex justify-between items-center">
      <Link href="/" passHref>
        <a className="py-3">
          <Logo />
        </a>
      </Link>

      <nav className="font-medium text-sm text-secondary-deemphasised space-x-8">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/blog">Blog</NavItem>
        <NavItem href="/">About</NavItem>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <svg
      height="2.5rem"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 24"
    >
      <g clipPath="url(#clip0)">
        <path
          fill="#3E2E8A"
          d="M12.633 9l-7.958 4.308 2.402 1.538 8.258-4.154L12.632 9z"
        ></path>
        <path
          fill="#9782FF"
          d="M19.86 5.874L9.93-.001 0 5.874v4.481l4.675 2.952L19.86 5.874zM.03 17.972l9.93 5.874 9.93-5.874V13.49l-4.555-2.799L.03 17.972z"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H20V24H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
