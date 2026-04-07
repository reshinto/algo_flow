// BST In-Order Traversal — left subtree, visit root, then right subtree

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstInorder(root *BSTNode) []int {
	result := []int{} // @step:initialize

	var traverse func(node *BSTNode)
	traverse = func(node *BSTNode) {
		if node == nil {
			return // @step:initialize
		}

		// Recurse into the left subtree first — smaller values come before root
		traverse(node.left) // @step:traverse-left
		// Record the root value — in-order guarantees sorted output for a valid BST
		result = append(result, node.value) // @step:visit
		// Recurse into the right subtree — larger values come after root
		traverse(node.right) // @step:traverse-right
	}

	traverse(root) // @step:initialize
	return result  // @step:complete
}
