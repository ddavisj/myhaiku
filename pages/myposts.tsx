import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const myPosts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { myPosts },
  };
};

type Props = {
  myPosts: PostProps[];
};

const MyPosts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  const myPublishedPosts = props.myPosts.filter((post) => !!post.published);
  const myDrafts = props.myPosts.filter((post) => !post.published);

  const renderPosts = (posts, title) => {
    if (posts.length) {
      return (
        <>
          <div className="font-bold mb-4 mt-6"> {title} </div>
          {posts.map((post) => (
            <div key={post.id}>
              <Post post={post} />
            </div>
          ))}
        </>
      );
    }
  };

  return (
    <Layout>
      <div>
        <main>
          {renderPosts(myDrafts, "Drafts")}
          {renderPosts(myPublishedPosts, "Published")}
        </main>
      </div>
    </Layout>
  );
};

export default MyPosts;
