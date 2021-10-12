import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { getAllFrontMatter, getFileBySlug } from "../../util/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import React, { FunctionComponent, ReactNode, useRef, useState } from "react";
import { Heading } from "../../util/types/TOCHeading";
import Link from "next/link";
import TableOfContents from "../../components/TableOfContents";
import { convertDateToHumanFormat } from "../../util/date";
import Pre from "../../components/Pre";
import Navbar from "../../components/Navbar";
import StyledLink, { ArrowLessLink } from "../../components/StyledLink";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import Footer from "../../components/Footer";
import { NextSeo } from "next-seo";

const BlogPost: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const Component = React.useMemo(
    () =>
      getMDXComponent(post.code, {
        motion: motion,
        AnimateSharedLayout: AnimateSharedLayout,
        AnimatePresence: AnimatePresence,
      }),
    [post.code]
  );
  return (
    <div>
      <NextSeo title={post.title} description={post.desc} />
      <Navbar />
      <div
        className="grid grid-flow-col gap-2"
        style={{
          gridTemplateColumns:
            "minmax(1.2rem, 1fr) minmax(auto, 75ch)  minmax(1.2rem, 1fr)",
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
          <Component components={{ pre: Pre, a: ArrowLessLink }} />
        </main>
      </div>
      <Footer />
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
  post.date = convertDateToHumanFormat(post.date);
  return {
    props: {
      post,
    },
  };
};
export default BlogPost;
