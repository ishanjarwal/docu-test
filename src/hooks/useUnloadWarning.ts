import { useEffect } from "react";

const useUnloadWarning = (condition: boolean = true) => {
  useEffect(() => {
    if (!condition) return;

    const listener = (e: BeforeUnloadEvent) => {
      e.preventDefault(); // so that tab doesn't clore by default
    };

    window.addEventListener("beforeunload", listener);

    return () => window.removeEventListener("beforeunload", listener);
  }, [condition]);
};

export default useUnloadWarning;
