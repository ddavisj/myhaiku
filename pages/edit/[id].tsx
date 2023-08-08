// Edit post

import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";

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

const Edit: React.FC<PostProps> = (props) => {
  // Rename old lines for comparison
  let {
    title: oldTitle,
    line1: oldLine1,
    line2: oldLine2,
    line3: oldLine3,
    id,
  } = props;

  const [title, setTitle] = useState(oldTitle);
  const [line1, setLine1] = useState(oldLine1);
  const [line2, setLine2] = useState(oldLine2);
  const [line3, setLine3] = useState(oldLine3);

  useEffect(() => {
    const update_button = document.getElementById(
      "update_button"
    ) as HTMLButtonElement;

    update_button ? (update_button.disabled = true) : "";

    if (update_button) {
      if (
        title !== oldTitle ||
        line1 !== oldLine1 ||
        line2 !== oldLine2 ||
        line3 !== oldLine3
      ) {
        update_button.disabled = false;
      }
    }
  }, [title, line1, line2, line3]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, line1, line2, line3 };
      const response = await fetch(`/api/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      Router.push(`/post/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;

  let heading: string = `${oldTitle}`;

  if (userHasValidSession && postBelongsToUser) {
    return (
      <Layout>
        <div>
          <form onSubmit={submitData}>
            <div className="mb-10">
              <span className="active-item">Editing</span>
            </div>
            <div>
              <label
                className="block tracking-wide text-sm font-bold"
                htmlFor="title"
              >
                Title
              </label>
              <input
                autoFocus
                id="title"
                className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                type="text"
                value={title}
              />
            </div>
            <div>
              <label
                className="block tracking-wide text-sm font-bold mt-4"
                htmlFor="first_name"
              >
                Content
              </label>
              <input
                id="line1"
                className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
                onChange={(e) => setLine1(e.target.value)}
                placeholder="Line 1 (5 syllables)"
                type="text"
                value={line1}
              />
            </div>
            <div>
              <input
                autoFocus
                className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
                onChange={(e) => setLine2(e.target.value)}
                placeholder="Line 2 (7 syllables)"
                type="text"
                value={line2}
              />
            </div>
            <div>
              <input
                autoFocus
                className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
                onChange={(e) => setLine3(e.target.value)}
                placeholder="Line 3 (5 syllables)"
                type="text"
                value={line3}
              />
            </div>
            <div className="flex flex-wrap justify-between items-center mt-2">
              <input
                className="btn-regular disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
                id="update_button"
                type="submit"
                value="Update"
              />
              <a
                className="btn-warning"
                href="#"
                onClick={() => Router.push("/")}
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="text-center">Not allowed to edit this post!</div>
      </Layout>
    );
  }
};

export default Edit;
