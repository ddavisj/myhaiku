import React, { useEffect, useState } from "react";

const Device = (props) => {
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    let initWidth: number = document.documentElement.clientWidth;
    setWindowWidth(initWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(document.documentElement.clientWidth);
    });
  }, []);

  return (
    <div className={`${windowWidth > 700 ? "wide" : "mobile"}`}>
      {props.children}
    </div>
  );
};

export default Device;
