// BST to Greater Tree (Iterative) — stack-based reverse in-order accumulation
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstToGreaterTreeIterative(root *BSTNode) *BSTNode {
	stack := []*BSTNode{} // @step:initialize
	runningSum := 0
	current := root

	for current != nil || len(stack) > 0 {
		// Push all right nodes first (reverse in-order visits right subtree first)
		for current != nil {
			stack = append(stack, current) // @step:search-node
			current = current.right
		}

		// Process the top node
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		// Accumulate sum and update node value
		runningSum += current.value // @step:found
		current.value = runningSum

		// Move to left subtree
		current = current.left // @step:search-node
	}

	return root // @step:complete
}
