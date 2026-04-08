// BST Pre-Order Traversal (Iterative) — NLR using an explicit stack

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstPreorderIterative(root *BSTNode) []int {
	result := []int{} // @step:initialize
	if root == nil {
		return result // @step:initialize
	}

	nodeStack := []*BSTNode{root} // @step:initialize

	for len(nodeStack) > 0 {
		// @step:initialize
		node := nodeStack[len(nodeStack)-1] // @step:pop-from-stack
		nodeStack = nodeStack[:len(nodeStack)-1]
		result = append(result, node.value) // @step:visit

		// Push right first so left is processed first (LIFO)
		if node.right != nil {
			// @step:push-to-stack
			nodeStack = append(nodeStack, node.right) // @step:push-to-stack
		}
		if node.left != nil {
			// @step:traverse-left
			nodeStack = append(nodeStack, node.left) // @step:traverse-left
		}
	}

	return result // @step:complete
}
