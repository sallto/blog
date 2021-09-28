import {
  GetStaticPathsContext,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import LineLink from "../../components/LineLink";
import PostCard from "../../components/PostCard";
import { getAllFrontMatter } from "../../util/mdx";
import { PartialPost } from "../../util/types/Post";

function PostList({ posts }: { posts: PartialPost[] }) {
  return (
    <ul className="divide-y divide-secondary-line">
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          href={`/blog/${post.slug}`}
          title={post.title}
          desc={post.desc}
        />
      ))}
    </ul>
  );
}

const PostOverView: NextPage<InferGetStaticPropsType<typeof getStaticProps>> =
  ({ posts }) => {
    return (
      <div className="mx-auto max-w-2xl">
        <h1 className="text-secondary-heading font-extrabold text-6xl pb-6">
          Blog
        </h1>
        <p className="text-secondary-placeholder text-2xl leading-8 pb-10">
          Learn about software development and watch a developer learning in
          public.
        </p>
        <div className="pb-4">
          <LineLink href="/subscribe">Subscribe to keep up!</LineLink>
        </div>
        <PostList posts={posts}></PostList>
      </div>
    );
  };
export const getStaticProps = async ({}: GetStaticPathsContext) => {
  const posts = await getAllFrontMatter();

  return { props: { posts } };
};
export default PostOverView;
