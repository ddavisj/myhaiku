import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, line1, line2, line3 };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <div className="mb-4">
            <span className="active-item">New Draft</span>
          </div>
          <input
            autoFocus
            className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setLine1(e.target.value)}
            className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
            placeholder="Line 1 (5 syllables)"
            type="text"
            value={line1}
          />
          <input
            onChange={(e) => setLine2(e.target.value)}
            className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
            placeholder="Line 2 (7 syllables)"
            type="text"
            value={line2}
          />
          <input
            onChange={(e) => setLine3(e.target.value)}
            className="w-full p-2 my-2 rounded border-2 border-solid border-gray-300"
            placeholder="Line 3 (5 syllables)"
            type="text"
            value={line3}
          />
          <div className="mt-2 flex flex-wrap justify-between items-center">
            <input
              className="btn-regular disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
              disabled={!title || !line1 || !line2 || !line3}
              type="submit"
              value="Create"
            />
            <a
              className="btn-warning"
              href="#"
              onClick={() => Router.push("/")}
            >
              <div>Cancel</div>
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
