// BST Range Sum (Iterative) — stack-based DFS summing nodes in [lowValue, highValue]
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstRangeSumIterative(root *BSTNode, lowValue int, highValue int) int {
	if root == nil {
		return 0 // @step:initialize
	}

	stack := []*BSTNode{root}
	totalSum := 0

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node.value >= lowValue && node.value <= highValue {
			// Node is in range — add to sum
			totalSum += node.value // @step:found
		}

		if node.left != nil && node.value > lowValue {
			// Left child exists and may have values in range
			stack = append(stack, node.left) // @step:search-node
		}

		if node.right != nil && node.value < highValue {
			// Right child exists and may have values in range
			stack = append(stack, node.right) // @step:search-node
		}
	}

	return totalSum // @step:complete
}
