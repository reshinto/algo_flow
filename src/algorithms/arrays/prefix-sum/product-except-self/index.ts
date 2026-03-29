/**
 * Product of Array Except Self algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { productExceptSelf } from "./sources/product-except-self.ts?fn";
import { generateProductExceptSelfSteps } from "./step-generator";
import { productExceptSelfEducational } from "./educational";

import typescriptSource from "./sources/product-except-self.ts?raw";
import pythonSource from "./sources/product-except-self.py?raw";
import javaSource from "./sources/ProductExceptSelf.java?raw";

interface ProductExceptSelfInput {
  inputArray: number[];
}

const productExceptSelfDefinition: AlgorithmDefinition<ProductExceptSelfInput> = {
  meta: {
    id: ALGORITHM_ID.PRODUCT_EXCEPT_SELF!,
    name: "Product of Array Except Self",
    category: CATEGORY.ARRAYS!,
    technique: "prefix-sum",
    description:
      "Computes an output array where each element is the product of all other elements, using two linear passes without division",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [1, 2, 3, 4, 5],
    },
  },
  execute: (input: ProductExceptSelfInput) => productExceptSelf(input.inputArray),
  generateSteps: generateProductExceptSelfSteps,
  educational: productExceptSelfEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(productExceptSelfDefinition);
