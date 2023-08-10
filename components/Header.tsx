import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const homeLink = (
    <div>
      <Link href="/">
        <a className="text-3xl font-bold" data-active={isActive("/")}>
          MyHaiku
        </a>
      </Link>
    </div>
  );

  let left = <div className="left">{homeLink}</div>;

  let right = null;

  if (status === "loading") {
    left = <div>{homeLink}</div>;
    right = (
      <div className="ml-auto">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="ml-auto">
        <Link href="/api/auth/signin">
          <div className="flex items-center cursor-pointer link-main-hover">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <a className="ml-3" data-active={isActive("/signup")}>
              Log in
            </a>
          </div>
        </Link>
      </div>
    );
  }

  let userTitle;
  if (session) {
    userTitle =
      session.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
        ? `${session.user?.email} (ADMIN)`
        : session.user?.email;
  }

  if (session) {
    left = <div>{homeLink}</div>;
    right = (
      <div className="ml-auto">
        <button onClick={() => signOut()}>
          <div className="flex items-center pointer link-main-hover">
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            <a className="ml-2 text-sm" title={userTitle}>
              Log out
            </a>
          </div>
        </button>
      </div>
    );
  }

  return (
    <nav className="flex p-8 pb-1 items-center content-center mb-4">
      {left}
      {right}
    </nav>
  );
};

export default Header;
