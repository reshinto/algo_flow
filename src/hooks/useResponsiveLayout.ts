import { useSyncExternalStore } from "react";
import { BREAKPOINTS } from "@/utils/constants";

/**
 * Subscribes to viewport width changes and returns whether the current
 * viewport is below the tablet breakpoint (mobile layout).
 */
function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.tablet - 1}px)`);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.innerWidth < BREAKPOINTS.tablet;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useResponsiveLayout(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
