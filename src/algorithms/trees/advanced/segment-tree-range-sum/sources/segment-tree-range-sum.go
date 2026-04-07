// Segment Tree — build from array then query range sums
package main

func segSumBuildNode(segTree []int64, array []int64, nodeIndex int, low int, high int) {
	if low == high {
		segTree[nodeIndex] = array[low] // @step:build-node
		return
	}
	mid := (low + high) / 2
	segSumBuildNode(segTree, array, 2*nodeIndex, low, mid)          // @step:traverse-left
	segSumBuildNode(segTree, array, 2*nodeIndex+1, mid+1, high)     // @step:traverse-right
	segTree[nodeIndex] = segTree[2*nodeIndex] + segTree[2*nodeIndex+1] // @step:update-segment
}

func segQueryRange(segTree []int64, nodeIndex int, low int, high int, qLow int, qHigh int) int64 {
	if qLow > high || qHigh < low {
		return 0 // @step:query-range
	}
	if qLow <= low && high <= qHigh {
		return segTree[nodeIndex] // @step:query-range
	}
	mid := (low + high) / 2
	leftSum := segQueryRange(segTree, 2*nodeIndex, low, mid, qLow, qHigh)          // @step:traverse-left
	rightSum := segQueryRange(segTree, 2*nodeIndex+1, mid+1, high, qLow, qHigh) // @step:traverse-right
	return leftSum + rightSum // @step:query-range
}

func segmentTreeRangeSum(array []int64, queries [][2]int) []int64 {
	arrayLength := len(array) // @step:initialize
	segTree := make([]int64, 4*arrayLength) // @step:initialize

	segSumBuildNode(segTree, array, 1, 0, arrayLength-1) // @step:build-node

	results := []int64{}
	for _, query := range queries {
		results = append(results, segQueryRange(segTree, 1, 0, arrayLength-1, query[0], query[1])) // @step:query-range
	}
	return results // @step:complete
}
