// BST Kth Smallest (Iterative) — stack-based in-order with counter
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstKthSmallestIterative(root *BSTNode, kthPosition int) int {
	stack := []*BSTNode{} // @step:initialize
	counter := 0
	current := root

	for current != nil || len(stack) > 0 {
		// Push all left nodes — they have smaller values
		for current != nil {
			stack = append(stack, current) // @step:search-node
			current = current.left
		}

		// Process next in-order node
		current = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		counter++

		if counter == kthPosition {
			return current.value // @step:found
		}

		// Move to right subtree
		current = current.right // @step:search-node
	}

	return -1 // @step:complete — k exceeds number of nodes
}
