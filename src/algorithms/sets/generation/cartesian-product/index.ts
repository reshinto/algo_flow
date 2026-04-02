import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cartesianProduct } from "./sources/cartesian-product.ts?fn";
import { generateCartesianProductSteps } from "./step-generator";
import type { CartesianProductInput } from "./step-generator";
import { cartesianProductEducational } from "./educational";

import typescriptSource from "./sources/cartesian-product.ts?raw";
import pythonSource from "./sources/cartesian-product.py?raw";
import javaSource from "./sources/CartesianProduct.java?raw";

function executeCartesianProduct(input: CartesianProductInput): number[][] {
  return cartesianProduct(input.setA, input.setB) as number[][];
}

const cartesianProductDefinition: AlgorithmDefinition<CartesianProductInput> = {
  meta: {
    id: ALGORITHM_ID.CARTESIAN_PRODUCT!,
    name: "Cartesian Product",
    category: CATEGORY.SETS!,
    technique: "generation",
    description:
      "Generate all ordered pairs (a, b) where a ∈ setA and b ∈ setB using nested iteration in O(n × m) time",
    timeComplexity: {
      best: "O(n × m)",
      average: "O(n × m)",
      worst: "O(n × m)",
    },
    spaceComplexity: "O(n × m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { setA: [1, 2, 3], setB: [4, 5] },
  },
  execute: executeCartesianProduct,
  generateSteps: generateCartesianProductSteps,
  educational: cartesianProductEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(cartesianProductDefinition);
