// Segment Tree — build from array then query range minimums
package main

import "math"

func segMinBuildNode(segTree []int, array []int, nodeIndex int, low int, high int) {
	if low == high {
		segTree[nodeIndex] = array[low] // @step:build-node
		return
	}
	mid := (low + high) / 2
	segMinBuildNode(segTree, array, 2*nodeIndex, low, mid)          // @step:traverse-left
	segMinBuildNode(segTree, array, 2*nodeIndex+1, mid+1, high)     // @step:traverse-right
	leftVal := segTree[2*nodeIndex]
	rightVal := segTree[2*nodeIndex+1]
	if leftVal < rightVal {
		segTree[nodeIndex] = leftVal
	} else {
		segTree[nodeIndex] = rightVal
	} // @step:update-segment
}

func segQueryMin(segTree []int, nodeIndex int, low int, high int, qLow int, qHigh int) int {
	if qLow > high || qHigh < low {
		return math.MaxInt32 // @step:query-range
	}
	if qLow <= low && high <= qHigh {
		return segTree[nodeIndex] // @step:query-range
	}
	mid := (low + high) / 2
	leftMin := segQueryMin(segTree, 2*nodeIndex, low, mid, qLow, qHigh)          // @step:traverse-left
	rightMin := segQueryMin(segTree, 2*nodeIndex+1, mid+1, high, qLow, qHigh) // @step:traverse-right
	if leftMin < rightMin {
		return leftMin
	}
	return rightMin // @step:query-range
}

func segmentTreeRangeMin(array []int, queries [][2]int) []int {
	arrayLength := len(array) // @step:initialize
	segTree := make([]int, 4*arrayLength)
	for pos := range segTree {
		segTree[pos] = math.MaxInt32
	} // @step:initialize

	segMinBuildNode(segTree, array, 1, 0, arrayLength-1) // @step:build-node

	results := []int{}
	for _, query := range queries {
		results = append(results, segQueryMin(segTree, 1, 0, arrayLength-1, query[0], query[1])) // @step:query-range
	}
	return results // @step:complete
}
