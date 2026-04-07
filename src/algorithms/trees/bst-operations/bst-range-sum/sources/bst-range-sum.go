// BST Range Sum (Recursive) — sum all nodes with values in [lowValue, highValue]
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstRangeSum(root *BSTNode, lowValue int, highValue int) int {
	if root == nil {
		return 0 // @step:initialize
	}

	sum := 0

	if root.value >= lowValue && root.value <= highValue {
		// Current node is in range — add its value
		sum += root.value // @step:found
	}

	if root.value > lowValue {
		// Left subtree may contain values in range
		sum += bstRangeSum(root.left, lowValue, highValue) // @step:search-node
	}

	if root.value < highValue {
		// Right subtree may contain values in range
		sum += bstRangeSum(root.right, lowValue, highValue) // @step:search-node
	}

	return sum // @step:complete
}
