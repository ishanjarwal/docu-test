import { useEffect, useState } from "react";

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Check for mobile devices
    if (
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    ) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return { isMobile, isDesktop: !isMobile };
}
