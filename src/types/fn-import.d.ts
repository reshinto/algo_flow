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
