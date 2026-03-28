import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

import { BREAKPOINTS } from "@/utils/constants";
import { useResponsiveLayout } from "./useResponsiveLayout";

function setWindowWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
}

function mockMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("useResponsiveLayout", () => {
  const originalWidth = window.innerWidth;

  beforeEach(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    setWindowWidth(originalWidth);
    vi.restoreAllMocks();
  });

  it('returns "mobile" when width is below mobile breakpoint', () => {
    setWindowWidth(BREAKPOINTS.mobile - 1);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe("mobile");
  });

  it('returns "tablet" when width is between mobile and tablet breakpoints', () => {
    setWindowWidth(BREAKPOINTS.mobile);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe("tablet");
  });

  it('returns "tablet" at upper tablet boundary', () => {
    setWindowWidth(BREAKPOINTS.tablet - 1);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe("tablet");
  });

  it('returns "desktop" when width is at or above tablet breakpoint', () => {
    setWindowWidth(BREAKPOINTS.tablet);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe("desktop");
  });

  it('returns "desktop" for large viewport widths', () => {
    setWindowWidth(1920);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe("desktop");
  });
});
