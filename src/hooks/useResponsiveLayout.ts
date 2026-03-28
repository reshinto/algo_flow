/**
 * Three-tier responsive layout hook using React 18's `useSyncExternalStore`.
 * Returns "mobile" | "tablet" | "desktop" based on viewport width.
 */
import { useSyncExternalStore } from "react";
import { BREAKPOINTS } from "@/utils/constants";

export type LayoutTier = "mobile" | "tablet" | "desktop";

const mobileQuery = `(max-width: ${BREAKPOINTS.mobile - 1}px)`;
const tabletQuery = `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`;

function subscribe(callback: () => void) {
  const mobileMedia = window.matchMedia(mobileQuery);
  const tabletMedia = window.matchMedia(tabletQuery);

  mobileMedia.addEventListener("change", callback);
  tabletMedia.addEventListener("change", callback);

  return () => {
    mobileMedia.removeEventListener("change", callback);
    tabletMedia.removeEventListener("change", callback);
  };
}

function getSnapshot(): LayoutTier {
  const width = window.innerWidth;
  if (width < BREAKPOINTS.mobile) return "mobile";
  if (width < BREAKPOINTS.tablet) return "tablet";
  return "desktop";
}

function getServerSnapshot(): LayoutTier {
  return "desktop";
}

export function useResponsiveLayout(): LayoutTier {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
