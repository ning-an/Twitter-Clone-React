import { useSpring, animated } from "react-spring";
import React from "react";

export const ScaleIn = ({ children }) => {
  const style = useSpring({
    from: {
      transform: "scale(0)",
    },
    transform: "scale(1)",
    config: {
      // duration: 300,
      tension: 300,
      friction: 10,
    },
  });
  return <animated.div style={style}>{children}</animated.div>;
};
