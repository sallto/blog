import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { getAllFrontMatter, getFileBySlug } from "../../util/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import React, { FunctionComponent, useRef, useState } from "react";
import { Heading } from "../../util/types/TOCHeading";
import Link from "next/link";
import { useActiveHeading } from "../../util/useActiveHeading";
import { useIntersectionObserver } from "usehooks-ts";

function TOCEntry({
  heading,
  isVisible,
}: {
  heading: Heading;
  isVisible: boolean;
}) {
  return (
    <li className={"pl-4 relative " + (isVisible ? "text-primary-300" : "")}>
      {isVisible ? (
        <div className="absolute left-0 bottom-0 top-0 border-1 border-primary-300" />
      ) : null}
      <Link passHref href={heading.url}>
        <a>{heading.value}</a>
      </Link>
    </li>
  );
}

function TableOfContents({ headings }: TOCProps) {
  const realHeadings = [
    {
      depth: 0,
      url: "#title",
      value: "Introduction",
    },
  ].concat(headings);
  const [activeId, setActiveId] = useState("");
  useActiveHeading(
    realHeadings.map((h) => h.url),
    setActiveId
  );
  return (
    <ul className="ml-16 sticky top-36 text-secondary-placeholder text-lg space-y-2">
      {realHeadings.map((heading) => (
        <TOCEntry
          key={heading.value}
          heading={heading}
          isVisible={heading.url === activeId}
        ></TOCEntry>
      ))}
    </ul>
  );
}
type TOCProps = {
  headings: Heading[];
};
const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const Component = React.useMemo(
    () => getMDXComponent(post.code, {}),
    [post.code]
  );
  return (
    <div>
      <div
        className="grid grid-flow-col"
        style={{
          gridTemplateColumns:
            "minmax(1.2rem, 1fr) minmax(auto, 65ch)  minmax(1.2rem, 1fr)",
          gridTemplateRows: "min-content 1fr",
        }}
      >
        <nav className="hidden md:block col-start-1 row-start-2">
          <TableOfContents headings={post.toc} />
        </nav>
        <header className=" col-start-2 row-start-1 pb-16">
          <h2 className="text-secondary-placeholder text-lg text-center pb-2">
            {post.date}
          </h2>
          <h1
            id="title"
            className="text-secondary-heading text-center text-5xl font-extrabold"
          >
            {post.title}
          </h1>
        </header>
        <main className="prose-lg col-start-2 row-start-2 text-secondary-txt max-w-prose ">
          <Component components={{}} />
        </main>
      </div>
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllFrontMatter();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const post = await getFileBySlug(params?.slug as string);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  post.date = new Date(post.date).toLocaleDateString("en-US", options);
  return {
    props: {
      post,
    },
  };
};
export default BlogPost;
