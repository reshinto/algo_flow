// Merge Binary Trees — recursive: if both nodes exist, sum values; otherwise take non-null node

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func mergeBinaryTrees(treeA *BinaryNode, treeB *BinaryNode) *BinaryNode {
	if treeA == nil {
		return treeB // @step:initialize
	}
	if treeB == nil {
		return treeA // @step:initialize
	}

	// Both nodes exist — merge by summing values
	treeA.value += treeB.value // @step:merge-node

	// Recursively merge left and right subtrees
	treeA.left = mergeBinaryTrees(treeA.left, treeB.left)   // @step:traverse-left
	treeA.right = mergeBinaryTrees(treeA.right, treeB.right) // @step:traverse-right

	return treeA // @step:visit
}
