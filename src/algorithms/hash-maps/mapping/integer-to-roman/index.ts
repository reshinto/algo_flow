import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateIntegerToRomanSteps } from "./step-generator";
import type { IntegerToRomanInput } from "./step-generator";
import { integerToRomanEducational } from "./educational";

import typescriptSource from "./sources/integer-to-roman.ts?raw";
import pythonSource from "./sources/integer-to-roman.py?raw";
import javaSource from "./sources/IntegerToRoman.java?raw";
import rustSource from "./sources/integer-to-roman.rs?raw";
import cppSource from "./sources/IntegerToRoman.cpp?raw";
import goSource from "./sources/integer-to-roman.go?raw";

function executeIntegerToRoman(input: IntegerToRomanInput): string {
  const valuePairs: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let remaining = input.number;
  let result = "";
  for (const [numericValue, symbol] of valuePairs) {
    while (remaining >= numericValue) {
      remaining -= numericValue;
      result += symbol;
    }
  }
  return result;
}

const definition: AlgorithmDefinition<IntegerToRomanInput> = {
  meta: {
    id: ALGORITHM_ID.INTEGER_TO_ROMAN!,
    name: "Integer to Roman",
    category: CATEGORY.HASH_MAPS!,
    technique: "mapping",
    description:
      "Convert an integer to its Roman numeral representation using a greedy value-symbol lookup",
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { number: 1994 },
  },
  execute: executeIntegerToRoman,
  generateSteps: generateIntegerToRomanSteps,
  educational: integerToRomanEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(definition);
