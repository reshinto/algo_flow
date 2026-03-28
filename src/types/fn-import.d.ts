/**
 * Ambient type declarations for the `?fn` Vite plugin.
 *
 * Enables TypeScript to resolve named imports from `*.ts?fn` modules.
 * All exported functions are typed as `any` since the exact signatures are
 * not statically knowable from the wildcard declaration — use a type
 * assertion at each call site for full type safety.
 *
 * When adding a new algorithm that uses `?fn`, add its function name here.
 */
declare module "*.ts?fn" {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Dynamic Programming
  export const fibonacciTabulation: (...args: any[]) => any;
  export const fibonacciMemoization: (...args: any[]) => any;
  // Sorting
  export const bubbleSort: (...args: any[]) => any;
  // Searching
  export const binarySearch: (...args: any[]) => any;
  // Arrays
  export const maxSumSubarray: (...args: any[]) => any;
  export const kadanesAlgorithm: (...args: any[]) => any;
  export const bestTimeBuySell: (...args: any[]) => any;
  export const boyerMooreVoting: (...args: any[]) => any;
  export const moveZeros: (...args: any[]) => any;
  export const removeDuplicates: (...args: any[]) => any;
  export const findMissingNumber: (...args: any[]) => any;
  export const singleNumber: (...args: any[]) => any;
  export const twoPointerSum: (...args: any[]) => any;
  export const productExceptSelf: (...args: any[]) => any;
  export const threeSum: (...args: any[]) => any;
  export const dutchNationalFlag: (...args: any[]) => any;
  export const rotateArray: (...args: any[]) => any;
  export const nextGreaterElement: (...args: any[]) => any;
  export const containerWithMostWater: (...args: any[]) => any;
  export const lomutoPartition: (...args: any[]) => any;
  export const cyclicSort: (...args: any[]) => any;
  export const prefixSum: (...args: any[]) => any;
  export const subarraySumEqualsK: (...args: any[]) => any;
  export const mergeSortedArrays: (...args: any[]) => any;
  export const differenceArray: (...args: any[]) => any;
  export const countingSort: (...args: any[]) => any;
  export const rotateArrayCyclic: (...args: any[]) => any;
  export const findAllDuplicates: (...args: any[]) => any;
  export const firstMissingPositive: (...args: any[]) => any;
  export const xorRangeQuery: (...args: any[]) => any;
  export const countAnagramWindows: (...args: any[]) => any;
  export const firstNegativeInWindow: (...args: any[]) => any;
  export const longestKDistinct: (...args: any[]) => any;
  export const maxProductSubarray: (...args: any[]) => any;
  export const quickselect: (...args: any[]) => any;
  export const minSumSubarray: (...args: any[]) => any;
  export const minSizeSubarraySum: (...args: any[]) => any;
  export const subarrayProductLessThanK: (...args: any[]) => any;
  export const maxConsecutiveOnes: (...args: any[]) => any;
  export const minimumSubarraySum: (...args: any[]) => any;
  export const trappingRainWater: (...args: any[]) => any;
  export const largestRectangleHistogram: (...args: any[]) => any;
  export const slidingWindowMaxDeque: (...args: any[]) => any;
  export const bestTimeBuySellUnlimited: (...args: any[]) => any;
  export const fourSum: (...args: any[]) => any;
  export const previousSmallerElement: (...args: any[]) => any;
  export const dailyTemperatures: (...args: any[]) => any;
  export const floydCycleDetection: (...args: any[]) => any;
  // Graph
  export const breadthFirstSearch: (...args: any[]) => any;
  // Trees
  export const bstInorder: (...args: any[]) => any;
  // Pathfinding
  export const dijkstra: (...args: any[]) => any;
  // Linked Lists
  export const reverseLinkedList: (...args: any[]) => any;
  // Heaps
  export const buildMinHeap: (...args: any[]) => any;
  // Stacks & Queues
  export const validParentheses: (...args: any[]) => any;
  // Hash Maps
  export const twoSum: (...args: any[]) => any;
  // Strings
  export const kmpSearch: (...args: any[]) => any;
  // Matrices
  export const spiralOrder: (...args: any[]) => any;
  // Sets
  export const setIntersection: (...args: any[]) => any;
}
