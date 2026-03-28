/** Step generator for Product of Array Except Self — produces ExecutionStep[] using ArrayTracker. */

import type { ExecutionStep } from "@/types";
import { ArrayTracker } from "@/trackers";
import { ALGORITHM_ID } from "@/utils/constants";
import { buildLineMapFromSources } from "@/utils/source-loader";

/* Line map is built dynamically from @step markers in the source files */
const LINE_MAP = buildLineMapFromSources(ALGORITHM_ID.PRODUCT_EXCEPT_SELF!);

interface ProductExceptSelfInput {
  inputArray: number[];
}

export function generateProductExceptSelfSteps(input: ProductExceptSelfInput): ExecutionStep[] {
  const { inputArray } = input;
  const arrayLength = inputArray.length;

  const tracker = new ArrayTracker([...inputArray], LINE_MAP);

  tracker.initialize({
    inputArray: [...inputArray],
    arrayLength,
    phase: "start",
  });

  if (arrayLength === 0) {
    tracker.complete({ resultArray: [] });
    return tracker.getSteps();
  }

  const resultArray: number[] = new Array(arrayLength).fill(1) as number[];

  // Prefix pass: left to right
  let prefixProduct = 1;
  for (let scanIndex = 0; scanIndex < arrayLength; scanIndex++) {
    resultArray[scanIndex] = prefixProduct;
    prefixProduct *= inputArray[scanIndex]!;

    tracker.visit(
      scanIndex,
      {
        scanIndex,
        prefixProduct: resultArray[scanIndex],
        suffixProduct: null,
        resultArray: [...resultArray],
        phase: "prefix",
      },
      `Prefix pass: set result[${scanIndex}] = ${resultArray[scanIndex]} (product of all left elements)`,
    );
  }

  // Suffix pass: right to left
  let suffixProduct = 1;
  for (let scanIndex = arrayLength - 1; scanIndex >= 0; scanIndex--) {
    resultArray[scanIndex]! *= suffixProduct;
    suffixProduct *= inputArray[scanIndex]!;

    tracker.markElement(
      scanIndex,
      "sorted",
      {
        scanIndex,
        prefixProduct: null,
        suffixProduct,
        resultValue: resultArray[scanIndex],
        resultArray: [...resultArray],
        phase: "suffix",
      },
      `Suffix pass: result[${scanIndex}] = ${resultArray[scanIndex]} (prefix × suffix products)`,
    );
  }

  tracker.complete({
    resultArray: [...resultArray],
  });

  return tracker.getSteps();
}
