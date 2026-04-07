// BST Post-Order Traversal (Iterative) — LRN using two stacks

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstPostorderIterative(root *BSTNode) []int {
	result := []int{} // @step:initialize
	if root == nil {
		return result // @step:initialize
	}

	stack1 := []*BSTNode{root} // @step:initialize
	stack2 := []*BSTNode{}     // @step:initialize

	// Phase 1: push nodes onto stack2 in reverse post-order
	for len(stack1) > 0 {
		// @step:push-to-stack
		node := stack1[len(stack1)-1] // @step:pop-from-stack
		stack1 = stack1[:len(stack1)-1]
		stack2 = append(stack2, node) // @step:push-to-stack

		if node.left != nil {
			// @step:traverse-left
			stack1 = append(stack1, node.left) // @step:traverse-left
		}
		if node.right != nil {
			// @step:traverse-right
			stack1 = append(stack1, node.right) // @step:traverse-right
		}
	}

	// Phase 2: pop stack2 in post-order and visit each node
	for len(stack2) > 0 {
		// @step:visit
		node := stack2[len(stack2)-1] // @step:pop-from-stack
		stack2 = stack2[:len(stack2)-1]
		result = append(result, node.value) // @step:visit
	}

	return result // @step:complete
}
