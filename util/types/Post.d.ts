import { Heading } from "./TOCHeading";

export interface PartialPost {
  slug: string;
  title: string;
  desc: string;
  date: string;
  tags: string[];
  lastmod?: string;
  draft?: boolean;
  images?: string[];
}
export interface Post extends PartialPost {
  code: any;
  toc: Heading[];
}
