import { useEffect, useState } from "react";

export function useMobileView(): boolean {
  // Always start with false to match server-rendered HTML and prevent hydration mismatch
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only check window width after component mounts (client-side only)
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    // Check immediately on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
