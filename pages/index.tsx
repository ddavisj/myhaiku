import React from "react";
import { GetStaticProps } from "next";

import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";

import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const AllHaiku: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page mb-6">
        {/* <h2 className="mb-6 font-bold">All Haiku</h2> */}
        <main>
          <p className="mb-4">
            Haiku is an ancient Japanese form of poetry. Classical haiku have 3
            lines with 5,7 and 5 syllables, include a seasonal reference and
            capture a moment in time.
          </p>
          <h2 className="font-bold mb-4">Recently Shared</h2>

          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default AllHaiku;
