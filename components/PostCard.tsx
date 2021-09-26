import Link from "next/link";

export default function PostCard({ href, title, desc }: PostCardProps) {
  return (
    <li className="py-12">
      <h2 className="text-3xl text-secondary-heading font-extrabold pb-3">
        {title}
      </h2>
      <p className="text-lg text-secondary-deemphasised pb-5">{desc}</p>
      <Link href={href} passHref>
        <a className="text-primary-300 font-medium text-lg ">
          Read more &rarr;
        </a>
      </Link>
    </li>
  );
}
type PostCardProps = {
  href: string;
  title: string;
  desc: string;
};
