// BST Post-Order Traversal — left subtree, right subtree, visit root (LRN)

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstPostorder(root *BSTNode) []int {
	result := []int{} // @step:initialize

	var traverse func(node *BSTNode)
	traverse = func(node *BSTNode) {
		if node == nil {
			return // @step:initialize
		}

		// Recurse into the left subtree first
		traverse(node.left) // @step:traverse-left
		// Recurse into the right subtree
		traverse(node.right) // @step:traverse-right
		// Visit the root last — after both children have been processed
		result = append(result, node.value) // @step:visit
	}

	traverse(root) // @step:initialize
	return result  // @step:complete
}
