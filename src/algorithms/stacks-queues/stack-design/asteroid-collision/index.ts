import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { asteroidCollision } from "./sources/asteroid-collision.ts?fn";
import { generateAsteroidCollisionSteps } from "./step-generator";
import type { AsteroidCollisionInput } from "./step-generator";
import { asteroidCollisionEducational } from "./educational";

import typescriptSource from "./sources/asteroid-collision.ts?raw";
import pythonSource from "./sources/asteroid-collision.py?raw";
import javaSource from "./sources/AsteroidCollision.java?raw";

function executeAsteroidCollision(input: AsteroidCollisionInput): number[] {
  return asteroidCollision(input.asteroids) as number[];
}

const asteroidCollisionDefinition: AlgorithmDefinition<AsteroidCollisionInput> = {
  meta: {
    id: ALGORITHM_ID.ASTEROID_COLLISION!,
    name: "Asteroid Collision",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "stack-design",
    description:
      "Use a stack to simulate asteroids moving in opposite directions — positive move right, negative move left — resolving collisions by size until all remaining asteroids move without conflict",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { asteroids: [5, 10, -5] },
  },
  execute: executeAsteroidCollision,
  generateSteps: generateAsteroidCollisionSteps,
  educational: asteroidCollisionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(asteroidCollisionDefinition);
