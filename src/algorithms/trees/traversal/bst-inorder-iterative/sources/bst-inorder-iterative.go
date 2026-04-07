// BST In-Order Traversal (Iterative) — LNR using an explicit stack

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstInorderIterative(root *BSTNode) []int {
	result := []int{}    // @step:initialize
	nodeStack := []*BSTNode{} // @step:initialize
	current := root      // @step:initialize

	for current != nil || len(nodeStack) > 0 {
		// @step:initialize
		// Push all left children onto the stack
		for current != nil {
			// @step:push-to-stack
			nodeStack = append(nodeStack, current) // @step:push-to-stack
			current = current.left                 // @step:traverse-left
		}

		// Pop the top node and visit it
		current = nodeStack[len(nodeStack)-1] // @step:pop-from-stack
		nodeStack = nodeStack[:len(nodeStack)-1]
		result = append(result, current.value) // @step:visit

		// Move to right subtree
		current = current.right // @step:traverse-right
	}

	return result // @step:complete
}
