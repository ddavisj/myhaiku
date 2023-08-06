import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import Header from "./Header";
import Navigation from "./Navigation";
import Device from "./Device";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const imageStyle = {
    borderRadius: "50%",
    border: "1px solid #fff",
  };

  interface imageStyle {
    borderRadius: string;
    border: string;
  }

  return (
    <Device>
      <div className="z-0 relative h-full">
        <Image
          src="/images/myhaiku-bg.jpg"
          alt="Nature vibes"
          objectFit="cover"
          layout="fill"
        />
        <div className="relative z-10 mx-auto max-w-lg">
          <Header />
          {session ? <Navigation /> : ""}
          <div className="py-0 px-8">{props.children}</div>
        </div>
      </div>
    </Device>
  );
};

export default Layout;
