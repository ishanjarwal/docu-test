"use client";
import { Ring } from "@uiball/loaders";
import Color from "color";
import { useEffect, useState } from "react";

const PageLoader = () => {
  const [color, setColor] = useState("#000000");
  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const hslColor = rootStyles.getPropertyValue("--primary").trim();
    const hexColor = Color(`hsl(${hslColor})`).hex();
    setColor(hexColor);
  }, []);

  return <Ring color={color}></Ring>;
};

export default PageLoader;
