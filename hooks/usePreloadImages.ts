"use client";

import { useEffect, useRef } from "react";

export function usePreloadImages(urls: string[]) {
  const cacheRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    for (const url of urls) {
      if (!url || cacheRef.current.has(url)) continue;
      const img = new Image();
      img.src = url;
      cacheRef.current.add(url);
    }
  }, [urls]);
}
