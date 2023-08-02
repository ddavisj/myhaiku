// View post

import React from "react";
// import { GetServerSideProps } from "next";
import Router from "next/router";
import { useSession } from "next-auth/react";

import { PostProps } from "./Post";

// import prisma from "../lib/prisma";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const post = await prisma.post.findUnique({
//     where: {
//       id: String(params?.id),
//     },
//     include: {
//       author: {
//         select: { name: true, email: true },
//       },
//     },
//   });
//   return {
//     props: post,
//   };
// };

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function unPublishPost(id: string): Promise<void> {
  await fetch(`/api/unpublish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Actions: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <>
      <div>WORKS</div>
      <div className="flex mt-6">
        <div>session {!!userHasValidSession}&nbsp;</div>
        <div>belongs {!!postBelongsToUser}&nbsp;</div>
        {/* {userHasValidSession && postBelongsToUser && ( */}
        <button
          className="btn-regular"
          onClick={() => Router.push("/edit/[id]", `/edit/${props.id}`)}
        >
          Edit
        </button>
        {/* )} */}
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button
            className="btn-regular ml-4"
            onClick={() => publishPost(props.id)}
          >
            Publish
          </button>
        )}
        {props.published && userHasValidSession && postBelongsToUser && (
          <button
            className="btn-regular ml-4"
            onClick={() => unPublishPost(props.id)}
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
    </>
  );
};

export default Actions;
