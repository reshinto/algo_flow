import { describe, it, expect } from "vitest";
import { asteroidCollision } from "../sources/asteroid-collision.ts?fn";

describe("asteroidCollision", () => {
  it("the smaller asteroid is destroyed when colliding with a larger one", () => {
    expect(asteroidCollision([5, 10, -5])).toEqual([5, 10]);
  });

  it("both asteroids explode when they are equal in size", () => {
    expect(asteroidCollision([8, -8])).toEqual([]);
  });

  it("the larger right-mover survives when the left-mover is smaller", () => {
    expect(asteroidCollision([10, 2, -5])).toEqual([10]);
  });

  it("no collisions occur when all asteroids move in the same direction", () => {
    expect(asteroidCollision([-2, -1, 1, 2])).toEqual([-2, -1, 1, 2]);
  });

  it("all asteroids are destroyed in a chain of equal collisions", () => {
    expect(asteroidCollision([1, -1, 1, -1])).toEqual([]);
  });

  it("a large left-mover destroys all preceding right-movers", () => {
    expect(asteroidCollision([1, 2, 3, -10])).toEqual([-10]);
  });

  it("two left-movers with no right-movers ahead pass through unchanged", () => {
    expect(asteroidCollision([-5, -3])).toEqual([-5, -3]);
  });

  it("a single asteroid is returned unchanged", () => {
    expect(asteroidCollision([7])).toEqual([7]);
  });

  it("an empty array returns an empty array", () => {
    expect(asteroidCollision([])).toEqual([]);
  });

  it("handles a chain reaction where multiple right-movers are destroyed one by one", () => {
    expect(asteroidCollision([5, 3, 1, -4])).toEqual([5]);
  });
});
