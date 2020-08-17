import React from "react";
import { useSpring, animated } from "react-spring";

export const PoppingCircle = () => {
  const turnBlue = useSpring({
    from: {
      backgroundColor: "pink",
      opacity: 1,
    },
    to: {
      backgroundColor: "blue",
      opacity: 0,
    },
    config: {
      duration: 200,
      tension: 400,
      friction: 50,
    },
  });
  return (
    <>
      <animated.div
        style={{
          zIndex: 5,
          position: "absolute",
          borderRadius: "50%",
          width: "100%",
          height: "100%",
          margin: 0,
          ...turnBlue,
        }}
      />
    </>
  );
};
