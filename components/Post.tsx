import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  line1: string;
  line2: string;
  line3: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div
      className="p-8 text-white bg-black cursor-pointer shadow hover:shadow-lg transition-shadow mb-6"
      onClick={() => Router.push("/post/[id]", `/post/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <small className="mb-4">By {authorName}</small>
      <ReactMarkdown className="mt-1" children={post.line1} />
      <ReactMarkdown children={post.line2} />
      <ReactMarkdown children={post.line3} />
    </div>
  );
};

export default Post;
