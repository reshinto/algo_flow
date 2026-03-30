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
  export const tribonacciTabulation: (...args: any[]) => any;
  export const uniquePaths: (...args: any[]) => any;
  export const catalanNumber: (...args: any[]) => any;
  export const knapsack01: (...args: any[]) => any;
  export const lisMemoization: (...args: any[]) => any;
  export const lisLength: (...args: any[]) => any;
  export const partitionEqualSubset: (...args: any[]) => any;
  export const pascalsTriangleRow: (...args: any[]) => any;
  export const rodCutting: (...args: any[]) => any;
  export const tribonacciMemoization: (...args: any[]) => any;
  export const wordBreakMemoization: (...args: any[]) => any;
  export const wordBreakTabulation: (...args: any[]) => any;
  export const canJump: (...args: any[]) => any;
  export const climbingStairsMemoization: (...args: any[]) => any;
  export const climbingStairsTabulation: (...args: any[]) => any;
  export const coinChangeMinMemoization: (...args: any[]) => any;
  export const coinChangeMinTabulation: (...args: any[]) => any;
  export const coinChangeWays: (...args: any[]) => any;
  export const countBits: (...args: any[]) => any;
  export const decodeWaysMemoization: (...args: any[]) => any;
  export const decodeWaysTabulation: (...args: any[]) => any;
  export const houseRobberMemoization: (...args: any[]) => any;
  export const houseRobberTabulation: (...args: any[]) => any;
  export const integerBreakTabulation: (...args: any[]) => any;
  export const integerBreakMemoization: (...args: any[]) => any;
  export const maxSubarrayKadane: (...args: any[]) => any;
  export const minCostClimbingStairsMemoization: (...args: any[]) => any;
  export const minCostClimbingStairsTabulation: (...args: any[]) => any;
  export const minimumJumps: (...args: any[]) => any;
  export const perfectSquares: (...args: any[]) => any;
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
  export const hierholzersAlgorithm: (...args: any[]) => any;
  export const breadthFirstSearch: (...args: any[]) => any;
  export const hungarianMatching: (...args: any[]) => any;
  export const connectedComponents: (...args: any[]) => any;
  export const tarjanSCC: (...args: any[]) => any;
  export const kosarajuSCC: (...args: any[]) => any;
  export const findBridges: (...args: any[]) => any;
  export const findArticulationPoints: (...args: any[]) => any;
  export const fordFulkerson: (...args: any[]) => any;
  export const edmondsKarp: (...args: any[]) => any;
  export const greedyColoring: (...args: any[]) => any;
  export const bipartiteCheck: (...args: any[]) => any;
  export const kruskalsAlgorithm: (...args: any[]) => any;
  export const primsAlgorithm: (...args: any[]) => any;
  export const boruvkasAlgorithm: (...args: any[]) => any;
  export const dijkstraShortestPath: (...args: any[]) => any;
  export const aStarSearch: (...args: any[]) => any;
  export const dagShortestPath: (...args: any[]) => any;
  export const bellmanFord: (...args: any[]) => any;
  export const floydWarshall: (...args: any[]) => any;
  export const kahnsTopologicalSort: (...args: any[]) => any;
  export const dfsTopologicalSort: (...args: any[]) => any;
  export const depthFirstSearch: (...args: any[]) => any;
  export const bidirectionalBFS: (...args: any[]) => any;
  export const iterativeDeepeningDFS: (...args: any[]) => any;
  export const dfsCycleDirected: (...args: any[]) => any;
  export const dfsCycleUndirected: (...args: any[]) => any;
  export const unionFindCycle: (...args: any[]) => any;
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
  export const romanToInteger: (...args: any[]) => any;
  export const groupAnagrams: (...args: any[]) => any;
  export const longestConsecutiveSequence: (...args: any[]) => any;
  export const topKFrequentElements: (...args: any[]) => any;
  export const sortCharactersByFrequency: (...args: any[]) => any;
  export const findAllAnagrams: (...args: any[]) => any;
  export const fourSumII: (...args: any[]) => any;
  export const wordPattern: (...args: any[]) => any;
  export const happyNumber: (...args: any[]) => any;
  export const jewelsAndStones: (...args: any[]) => any;
  // Strings
  export const kmpSearch: (...args: any[]) => any;
  // Matrices
  export const spiralOrder: (...args: any[]) => any;
  // Sets
  export const setIntersection: (...args: any[]) => any;
}
