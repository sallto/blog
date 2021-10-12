import path from "path";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import remarkNextImage from "./remarkNextImage";
import remarkTocHeadings from "./remarkTOC";
import remarkGfm from "remark-gfm";
import { bundleMDX } from "mdx-bundler";
import fs from "fs";
const root = process.cwd();
export async function getFileBySlug(slug: string) {
  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }
  let toc: Heading[] = [];
  const filePath = path.join(root, "_content", "posts", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { frontmatter, code } = await bundleMDX(source, {
    cwd: path.join(process.cwd(), "components"),
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkTocHeadings, { exportRef: toc }],
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkNextImage,
        remarkGfm,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }],
      ];
      return options;
    },
    esbuildOptions(options) {
      options.minify = true;
      return options;
    },
    globals: {
      motion: "motion",
      AnimateSharedLayout: "AnimateSharedLayout",
    },
  });
  return {
    toc,
    slug,
    ...frontmatter,
    code,
  } as Post;
}
import matter from "gray-matter";
import { Heading } from "./types/TOCHeading";
import { Post, PartialPost } from "./types/Post";
import { motion } from "framer-motion";
export async function getAllFrontMatter() {
  const contentPath = path.join(root, "_content", "posts");
  const files = fs.readdirSync(contentPath);
  const frontmatterList: PartialPost[] = [];
  files.forEach((file) => {
    const parsedPath = path.parse(file);
    if (parsedPath.ext !== ".mdx") {
      return;
    }
    const fileName = parsedPath.name;
    const { data: frontmatter } = matter(
      fs.readFileSync(path.join(contentPath, file), "utf8")
    );
    frontmatterList.push({
      slug: fileName,
      ...frontmatter,
    } as PartialPost);
  });
  return frontmatterList;
}
