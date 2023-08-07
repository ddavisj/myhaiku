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

const Post: React.FC<{ post: PostProps }> = ({ post, showPublished }) => {
  const authorName = post.author ? post.author.name : "Unknown author";

  console.log("post", post);
  console.log("post-pub", post.published);

  const renderPublished = () => {
    if (showPublished) {
      if (post.published) {
        return <p>Published</p>;
      } else {
        return <p>Draft</p>;
      }
    }
  };

  return (
    <div
      className="rounded p-8 text-white bg-black cursor-pointer shadow hover:shadow-lg transition-shadow mb-6"
      onClick={() => Router.push("/post/[id]", `/post/${post.id}`)}
    >
      <div className="w-3/4 mx-auto">
        <h2>{post.title}</h2>
        <small className="mb-4">by {authorName}</small>
        <ReactMarkdown className="mt-3 text-base" children={post.line1} />
        <ReactMarkdown className="text-base" children={post.line2} />
        <ReactMarkdown className="text-base" children={post.line3} />
        {/* <ReactMarkdown className="text-base" children={post.published} /> */}
        <div className="mt-4 text-sm text-right">{renderPublished()}</div>
      </div>
    </div>
  );
};

export default Post;
