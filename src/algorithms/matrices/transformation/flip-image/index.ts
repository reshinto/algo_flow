import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { flipImage } from "./sources/flip-image.ts?fn";
import { generateFlipImageSteps } from "./step-generator";
import type { FlipImageInput } from "./step-generator";
import { flipImageEducational } from "./educational";

import typescriptSource from "./sources/flip-image.ts?raw";
import pythonSource from "./sources/flip-image.py?raw";
import javaSource from "./sources/FlipImage.java?raw";

function executeFlipImage(input: FlipImageInput): number[][] {
  const matrixCopy = input.matrix.map((row) => [...row]);
  return flipImage(matrixCopy) as number[][];
}

const flipImageDefinition: AlgorithmDefinition<FlipImageInput> = {
  meta: {
    id: ALGORITHM_ID.FLIP_IMAGE!,
    name: "Flip Image",
    category: CATEGORY.MATRICES!,
    technique: "transformation",
    description:
      "Flip a binary matrix horizontally and invert all values — O(m × n) time, O(1) space",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 1, 0],
        [1, 0, 1],
        [0, 0, 0],
      ],
    },
  },
  execute: executeFlipImage,
  generateSteps: generateFlipImageSteps,
  educational: flipImageEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(flipImageDefinition);
