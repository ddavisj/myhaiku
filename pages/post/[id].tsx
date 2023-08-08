// View post

import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useSession } from "next-auth/react";

import Layout from "../../components/Layout";
import Post, { PostProps } from "../../components/Post";

import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  // await Router.push("/");
}

async function unPublishPost(id: string): Promise<void> {
  await fetch(`/api/unpublish/${id}`, {
    method: "PUT",
  });
  // await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/myposts");
}

const ViewItem: React.FC<PostProps> = (props) => {
  const [published, setPublished] = useState(props.published);

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);

  let postBelongsToUser = false;
  postBelongsToUser =
    session?.user?.email === props.author?.email ||
    session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <Post post={props} />
        {userHasValidSession && postBelongsToUser && !published && (
          <p className="mt-2 mb-2 font-bold">Your post is not published.</p>
        )}
        {userHasValidSession && postBelongsToUser && published && (
          <p className="mt-2 mb-2 font-bold">Your post is published.</p>
        )}
        <div className="flex mt-6">
          {userHasValidSession && postBelongsToUser && (
            <button
              className="btn-regular"
              onClick={() => Router.push("/edit/[id]", `/edit/${props.id}`)}
            >
              Edit
            </button>
          )}

          {userHasValidSession && postBelongsToUser && !published && (
            <button
              className="btn-regular ml-4"
              onClick={() => {
                setPublished(true);
                publishPost(props.id);
              }}
            >
              Publish
            </button>
          )}
          {userHasValidSession && postBelongsToUser && published && (
            <button
              className="btn-regular ml-4"
              onClick={() => {
                setPublished(false);
                unPublishPost(props.id);
              }}
            >
              Unpublish
            </button>
          )}
          <div className="ml-auto">
            {userHasValidSession && postBelongsToUser && (
              <button
                className="btn-warning ml-4"
                onClick={() => deletePost(props.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewItem;
