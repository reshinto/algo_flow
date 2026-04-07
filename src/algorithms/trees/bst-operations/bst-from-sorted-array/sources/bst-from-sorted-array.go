// BST From Sorted Array (Recursive) — pick middle as root, recurse on halves
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func buildBST(sortedArray []int, leftIndex int, rightIndex int) *BSTNode {
	if leftIndex > rightIndex {
		return nil // @step:initialize
	}

	// Pick the middle element as root to keep the tree balanced
	midIndex := (leftIndex + rightIndex) / 2 // @step:build-node
	node := &BSTNode{value: sortedArray[midIndex]}

	// Recursively build left and right subtrees
	node.left = buildBST(sortedArray, leftIndex, midIndex-1)   // @step:connect-child
	node.right = buildBST(sortedArray, midIndex+1, rightIndex) // @step:connect-child

	return node // @step:complete
}

func bstFromSortedArray(sortedArray []int) *BSTNode {
	return buildBST(sortedArray, 0, len(sortedArray)-1)
}
