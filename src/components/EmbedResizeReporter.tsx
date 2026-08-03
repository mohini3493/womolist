"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MESSAGE_TYPE = "womopreneur-embed:resize";

export default function EmbedResizeReporter() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.parent === window) return;

    document.documentElement.classList.add("is-embedded");

    const reportHeight = () => {
      // scrollHeight is spec-guaranteed to be >= clientHeight (the iframe's own
      // viewport), so it can only ever grow. Measure the actual content box
      // instead so the iframe can shrink back down on a shorter page.
      const height = Math.ceil(document.body.getBoundingClientRect().height);
      window.parent.postMessage({ type: MESSAGE_TYPE, height }, "*");
    };

    reportHeight();
    const raf = requestAnimationFrame(reportHeight);

    const observer = new ResizeObserver(reportHeight);
    observer.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
