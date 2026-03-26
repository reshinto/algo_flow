/**
 * @file useResponsiveLayout.ts
 * @module hooks/useResponsiveLayout
 *
 * Highly optimized viewport subscriber using React 18's `useSyncExternalStore`.
 * Decouples the UI responsivity from standard `useEffect/useState` loops, ensuring that the components
 * correctly tear down and re-mount based on explicitly defined breakpoints without intermediate tearing/flickers.
 */
import { useSyncExternalStore } from "react";
import { BREAKPOINTS } from "@/utils/constants";

/**
 * Subscribes to the raw DOM `window.matchMedia` API.
 * React invokes the callback explicitly when the browser crosses the physical pixel threshold.
 *
 * @param callback React dispatcher evaluating layout shifts.
 * @returns Event cleanup dismantler enforcing airtight memory limits.
 */
function subscribe(callback: () => void) {
  // Instantiates a strict boolean boundary evaluation against the global Tablet constraint.
  const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINTS.tablet - 1}px)`);

  // Appends universal listener triggering cross-platform dimension tracking.
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

/**
 * Instantly grabs the literal pixel configuration locally.
 * Prevents multiple frame re-renders by immediately informing React what layout needs to be compiled natively.
 */
function getSnapshot(): boolean {
  return window.innerWidth < BREAKPOINTS.tablet;
}

/**
 * Server-Side Rendering (SSR) fallback constraint.
 * Resolves to false natively because NextJS/Build engines do not possess `window` instances during compile time.
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Exposes a clean reactive boolean natively to the components.
 *
 * @returns `true` if the viewport is explicitly narrowed to a Mobile interface. Defaults to Desktop layout framework.
 */
export function useResponsiveLayout(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
