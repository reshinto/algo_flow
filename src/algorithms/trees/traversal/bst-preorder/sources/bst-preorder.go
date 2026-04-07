// BST Pre-Order Traversal — visit root, then left subtree, then right subtree (NLR)

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstPreorder(root *BSTNode) []int {
	result := []int{} // @step:initialize

	var traverse func(node *BSTNode)
	traverse = func(node *BSTNode) {
		if node == nil {
			return // @step:initialize
		}

		// Visit the current node first — root before any subtrees
		result = append(result, node.value) // @step:visit
		// Recurse into the left subtree
		traverse(node.left) // @step:traverse-left
		// Recurse into the right subtree
		traverse(node.right) // @step:traverse-right
	}

	traverse(root) // @step:initialize
	return result  // @step:complete
}
