import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { rotateLayerByLayer } from "./sources/rotate-layer-by-layer.ts?fn";
import { generateRotateLayerByLayerSteps } from "./step-generator";
import type { RotateLayerByLayerInput } from "./step-generator";
import { rotateLayerByLayerEducational } from "./educational";

import typescriptSource from "./sources/rotate-layer-by-layer.ts?raw";
import pythonSource from "./sources/rotate-layer-by-layer.py?raw";
import javaSource from "./sources/RotateLayerByLayer.java?raw";

function executeRotateLayerByLayer(input: RotateLayerByLayerInput): number[][] {
  const matrixCopy = input.matrix.map((row) => [...row]);
  return rotateLayerByLayer(matrixCopy) as number[][];
}

const rotateLayerByLayerDefinition: AlgorithmDefinition<RotateLayerByLayerInput> = {
  meta: {
    id: ALGORITHM_ID.ROTATE_LAYER_BY_LAYER!,
    name: "Rotate Layer by Layer",
    category: CATEGORY.MATRICES!,
    technique: "layer-operations",
    description:
      "Rotate an n×n matrix 90° clockwise by cycling elements in concentric layers — O(n²) time, O(1) space",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      matrix: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
    },
  },
  execute: executeRotateLayerByLayer,
  generateSteps: generateRotateLayerByLayerSteps,
  educational: rotateLayerByLayerEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(rotateLayerByLayerDefinition);
