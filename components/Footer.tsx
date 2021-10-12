import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <nav className="py-8 flex justify-center text-secondary-txt border-t-1 border-secondary-lightBg">
      <Link href="/impress" passHref>
        <a>Impress</a>
      </Link>
    </nav>
  );
}
