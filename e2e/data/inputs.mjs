import { fillTextInput, fillNumberInput, fillNthTextInput } from "../utils/dom-helpers.mjs";

export const inputTests = [
  { algo: "Bubble Sort", test: (page) => fillTextInput(page, "5, 3, 8, 1, 9, 2") },
  {
    algo: "Binary Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Linear Search",
    test: async (page) => {
      await fillTextInput(page, "4, 2, 7, 1, 9, 3");
      await fillNumberInput(page, 7);
    },
  },
  {
    algo: "Sentinel Linear Search",
    test: async (page) => {
      await fillTextInput(page, "4, 2, 7, 1, 9, 3");
      await fillNumberInput(page, 9);
    },
  },
  {
    algo: "Recursive Binary Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Exponential Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 8);
    },
  },
  {
    algo: "Interpolation Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Lower Bound Search",
    test: async (page) => {
      await fillTextInput(page, "1, 3, 3, 5, 5, 8");
      await fillNumberInput(page, 5);
    },
  },
  {
    algo: "Upper Bound Search",
    test: async (page) => {
      await fillTextInput(page, "1, 3, 3, 5, 5, 8");
      await fillNumberInput(page, 5);
    },
  },
  {
    algo: "Search in Rotated Sorted Array",
    test: async (page) => {
      await fillTextInput(page, "4, 5, 6, 7, 0, 1, 2");
      await fillNumberInput(page, 0);
    },
  },
  {
    algo: "Find Peak Element",
    test: (page) => fillTextInput(page, "1, 3, 20, 4, 1, 0"),
  },
  {
    algo: "Square Root via Binary Search",
    test: (page) => fillNumberInput(page, 49),
  },
  {
    algo: "Minimum in Rotated Sorted Array",
    test: (page) => fillTextInput(page, "4, 5, 6, 7, 0, 1, 2"),
  },
  {
    algo: "Meta Binary Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Uniform Binary Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Jump Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Fibonacci Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Hash-Based Search",
    test: async (page) => {
      await fillTextInput(page, "4, 2, 7, 1, 9, 3");
      await fillNumberInput(page, 9);
    },
  },
  {
    algo: "Ternary Search",
    test: async (page) => {
      await fillTextInput(page, "2, 5, 8, 12, 16");
      await fillNumberInput(page, 12);
    },
  },
  {
    algo: "Sliding Window (Max Sum)",
    test: async (page) => {
      await fillTextInput(page, "2, 1, 5, 1, 3, 2");
      await fillNumberInput(page, 3);
    },
  },
  {
    algo: "Kadane's Algorithm (Max Subarray)",
    test: (page) => fillTextInput(page, "-2, 1, -3, 4, -1, 2"),
  },
  {
    algo: "Best Time to Buy/Sell Stock",
    test: (page) => fillTextInput(page, "7, 1, 5, 3, 6, 4"),
  },
  {
    algo: "Boyer-Moore Voting (Majority)",
    test: (page) => fillTextInput(page, "2, 2, 1, 1, 1, 2, 2"),
  },
  { algo: "Move Zeros to End", test: (page) => fillTextInput(page, "0, 1, 0, 3, 12") },
  {
    algo: "Remove Duplicates (Sorted)",
    test: (page) => fillTextInput(page, "1, 1, 2, 2, 3, 4"),
  },
  {
    algo: "Two Sum (Sorted, Two Pointer)",
    test: async (page) => {
      await fillTextInput(page, "1, 2, 4, 6, 8, 11");
      await fillNumberInput(page, 10);
    },
  },
  { algo: "Find Missing Number (XOR)", test: (page) => fillTextInput(page, "3, 0, 1") },
  { algo: "Single Number (XOR)", test: (page) => fillTextInput(page, "4, 1, 2, 1, 2") },
  {
    algo: "Dutch National Flag (3-Way Partition)",
    test: (page) => fillTextInput(page, "2, 0, 1, 2, 1, 0"),
  },
  {
    algo: "Rotate Array (Reversal)",
    test: async (page) => {
      await fillTextInput(page, "1, 2, 3, 4, 5, 6, 7");
      await fillNumberInput(page, 3);
    },
  },
  { algo: "Next Greater Element", test: (page) => fillTextInput(page, "4, 5, 2, 10, 8") },
  {
    algo: "Container With Most Water",
    test: (page) => fillTextInput(page, "1, 8, 6, 2, 5, 4, 8, 3, 7"),
  },
  {
    algo: "Product of Array Except Self",
    test: (page) => fillTextInput(page, "1, 2, 3, 4, 5"),
  },
  {
    algo: "Three Sum (Zero Triplets)",
    test: (page) => fillTextInput(page, "-1, 0, 1, 2, -1, -4"),
  },
  {
    algo: "Lomuto Partition",
    test: (page) => fillTextInput(page, "8, 3, 6, 1, 5, 9, 2, 7"),
  },
  { algo: "Cyclic Sort", test: (page) => fillTextInput(page, "3, 5, 2, 1, 4, 6") },
  {
    algo: "Prefix Sum (Range Query)",
    test: (page) => fillTextInput(page, "2, 4, 1, 3, 5"),
  },
  {
    algo: "Subarray Sum Equals K",
    test: async (page) => {
      await fillTextInput(page, "1, 2, 3, -1, 1");
      await fillNumberInput(page, 3);
    },
  },
  {
    algo: "Merge Two Sorted Arrays",
    test: async (page) => {
      await fillNthTextInput(page, 0, "1, 3, 5, 7");
      await fillNthTextInput(page, 1, "2, 4, 6, 8");
    },
  },
  {
    algo: "Difference Array (Range Update)",
    test: (page) => fillNumberInput(page, 6),
  },
  {
    algo: "Counting Sort",
    test: (page) => fillTextInput(page, "4, 2, 2, 8, 3, 3, 1"),
  },
  {
    algo: "Sliding Window (Min Sum)",
    test: async (page) => {
      await fillTextInput(page, "4, 2, 1, 7, 8, 1, 2");
      await fillNumberInput(page, 3);
    },
  },
  {
    algo: "Min Size Subarray Sum",
    test: async (page) => {
      await fillTextInput(page, "2, 3, 1, 2, 4, 3");
      await fillNumberInput(page, 7);
    },
  },
  {
    algo: "Subarray Product < K",
    test: async (page) => {
      await fillTextInput(page, "10, 5, 2, 6");
      await fillNumberInput(page, 100);
    },
  },
  {
    algo: "Max Consecutive Ones III",
    test: async (page) => {
      await fillTextInput(page, "1, 1, 0, 0, 1, 1, 1, 0");
      await fillNumberInput(page, 2);
    },
  },
  {
    algo: "Minimum Subarray Sum",
    test: (page) => fillTextInput(page, "3, -4, 2, -3, -1, 7"),
  },
  {
    algo: "Count Anagram Windows",
    test: async (page) => {
      await fillNthTextInput(page, 0, "1, 2, 3, 1, 2, 1, 3");
      await fillNthTextInput(page, 1, "1, 2, 3");
    },
  },
  {
    algo: "First Negative in Window",
    test: async (page) => {
      await fillTextInput(page, "12, -1, -7, 8, -15, 30");
      await fillNumberInput(page, 3);
    },
  },
  {
    algo: "Longest K-Distinct Subarray",
    test: async (page) => {
      await fillTextInput(page, "1, 2, 1, 2, 3, 3, 4");
      await fillNumberInput(page, 2);
    },
  },
  {
    algo: "Maximum Product Subarray",
    test: (page) => fillTextInput(page, "2, 3, -2, 4, -1, 2"),
  },
  {
    algo: "Quickselect (K-th Smallest)",
    test: async (page) => {
      await fillTextInput(page, "7, 2, 1, 6, 8, 5, 3");
      await fillNumberInput(page, 4);
    },
  },
  {
    algo: "Rotate Array (Cyclic)",
    test: async (page) => {
      await fillTextInput(page, "1, 2, 3, 4, 5, 6");
      await fillNumberInput(page, 2);
    },
  },
  {
    algo: "Find All Duplicates",
    test: (page) => fillTextInput(page, "4, 3, 2, 7, 8, 2, 3, 1"),
  },
  {
    algo: "First Missing Positive",
    test: (page) => fillTextInput(page, "3, 4, -1, 1, 7, 5"),
  },
  {
    algo: "XOR Range Query",
    test: (page) => fillTextInput(page, "3, 5, 2, 7, 1, 4"),
  },
  {
    algo: "Trapping Rain Water",
    test: (page) => fillTextInput(page, "0, 1, 0, 2, 1, 0, 1, 3"),
  },
  {
    algo: "Largest Rectangle in Histogram",
    test: (page) => fillTextInput(page, "2, 1, 5, 6, 2, 3"),
  },
  {
    algo: "Sliding Window Maximum (Deque)",
    test: async (page) => {
      await fillTextInput(page, "1, 3, -1, -3, 5, 3, 6");
      await fillNumberInput(page, 3);
    },
  },
  {
    algo: "Best Time Buy/Sell (Unlimited)",
    test: (page) => fillTextInput(page, "7, 1, 5, 3, 6, 4"),
  },
  {
    algo: "Four Sum",
    test: async (page) => {
      await fillTextInput(page, "1, 0, -1, 0, -2, 2");
      await fillNumberInput(page, 0);
    },
  },
  {
    algo: "Previous Smaller Element",
    test: (page) => fillTextInput(page, "4, 10, 5, 8, 20, 15"),
  },
  {
    algo: "Daily Temperatures",
    test: (page) => fillTextInput(page, "73, 74, 75, 71, 69, 72, 76"),
  },
  {
    algo: "Floyd's Cycle Detection",
    test: (page) => fillTextInput(page, "1, 3, 4, 2, 2"),
  },
  {
    algo: "Fibonacci (Tabulation)",
    test: (page) => fillNumberInput(page, 10),
  },
  {
    algo: "KMP Search",
    test: async (page) => {
      await fillNthTextInput(page, 0, "AABABAB");
      await fillNthTextInput(page, 1, "ABAB");
    },
  },
  {
    algo: "Set Intersection",
    test: async (page) => {
      await fillNthTextInput(page, 0, "10, 20, 30, 40");
      await fillNthTextInput(page, 1, "20, 40, 60");
    },
  },
  {
    algo: "Two Sum",
    test: async (page) => {
      await fillTextInput(page, "3, 5, 8, 2");
      await fillNumberInput(page, 10);
    },
  },
  {
    algo: "Valid Parentheses",
    test: (page) => fillTextInput(page, "({[]})"),
  },
  {
    algo: "Build Min Heap",
    test: (page) => fillTextInput(page, "8, 3, 7, 1, 5"),
  },
  {
    algo: "Build Max Heap",
    test: (page) => fillTextInput(page, "3, 7, 1, 5, 9"),
  },
  {
    algo: "Heap Insert",
    test: async (page) => {
      await fillTextInput(page, "1, 3, 5, 7, 9");
      await fillNumberInput(page, 2);
    },
  },
  {
    algo: "Kth Largest Element",
    test: async (page) => {
      await fillTextInput(page, "3, 1, 5, 12, 2, 11");
      await fillNumberInput(page, 3);
    },
  },
  {
    algo: "Kth Smallest Element",
    test: async (page) => {
      await fillTextInput(page, "7, 10, 4, 3, 20");
      await fillNumberInput(page, 2);
    },
  },
  {
    algo: "Sort Nearly Sorted",
    test: async (page) => {
      await fillTextInput(page, "6, 5, 3, 2, 8, 10");
      await fillNumberInput(page, 3);
    },
  },
  {
    algo: "Reverse Linked List",
    test: (page) => fillTextInput(page, "1, 2, 3, 4, 5"),
  },
  {
    algo: "Spiral Order",
    test: async (page) => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ state: "visible", timeout: 5000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 2, 3\n4, 5, 6\n7, 8, 9");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Zigzag Traversal",
    test: async (page) => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ state: "visible", timeout: 5000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 2, 3\n4, 5, 6\n7, 8, 9");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Transpose Matrix",
    test: async (page) => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ state: "visible", timeout: 5000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 2, 3\n4, 5, 6\n7, 8, 9");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Set Matrix Zeroes",
    test: async (page) => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ state: "visible", timeout: 5000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 0, 3\n4, 5, 6\n7, 8, 9");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Kth Smallest in Sorted Matrix",
    test: async (page) => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ state: "visible", timeout: 5000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 5, 9\n10, 11, 13\n12, 13, 15");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Island Count",
    test: async (page) => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ state: "visible", timeout: 5000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 1, 0\n0, 1, 0\n0, 0, 1");
      await page.keyboard.press("Tab");
    },
  },
  {
    algo: "Rotate Layer by Layer",
    test: async (page) => {
      // Target the MatrixInputEditor textarea specifically (not Monaco's hidden internal textarea)
      const container = page
        .locator("div")
        .filter({ hasText: /Matrix rows/ })
        .last();
      const textarea = container.locator("textarea");
      await textarea.waitFor({ state: "visible", timeout: 5000 });
      await textarea.click({ clickCount: 3 });
      await textarea.fill("1, 2, 3\n4, 5, 6\n7, 8, 9");
      await page.keyboard.press("Tab");
    },
  },
];
