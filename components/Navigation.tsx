import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Navigation: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let right = null;
  let left = null;

  if (status === "loading") {
    console.log("LOADING");
    right = (
      <div className="ml-auto">
        <p>Loading...</p>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="menu mr-auto">
        <Link href="/">
          <a data-active={isActive("/")}>View all</a>
        </Link>
        <Link href="/myposts">
          <a className="ml-4" data-active={isActive("/myposts")}>
            My posts
          </a>
        </Link>
        <Link href="/drafts">
          <a className="ml-4" data-active={isActive("/drafts")}>
            My drafts
          </a>
        </Link>
      </div>
    );
    right = (
      <div className="ml-auto">
        <Link href="/new">
          <button className="btn-nobg bg-green-600">
            <div className="flex">
              <SparklesIcon className="text-white h-5 w-5 mr-2" />
              <a className="text-white">New</a>
            </div>
          </button>
        </Link>
      </div>
    );
  }

  return (
    <nav className="flex px-8 pt-2 items-center content-center mb-6">
      {left}
      {right}
    </nav>
  );
};

export default Navigation;
