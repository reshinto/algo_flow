// Is Balanced Tree — recursive DFS checking abs(leftHeight - rightHeight) ≤ 1 at every node

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

// checkHeight returns -1 if unbalanced, otherwise returns height of the subtree
func checkHeight(node *TreeNode) int {
	if node == nil {
		return 0 // @step:initialize
	}

	leftHeight := checkHeight(node.left) // @step:traverse-left
	if leftHeight == -1 {
		return -1 // @step:check-balance
	}

	rightHeight := checkHeight(node.right) // @step:traverse-right
	if rightHeight == -1 {
		return -1 // @step:check-balance
	}

	// Unbalanced if height difference exceeds 1
	diff := leftHeight - rightHeight
	if diff < 0 {
		diff = -diff
	}
	if diff > 1 {
		return -1 // @step:check-balance
	}

	if leftHeight > rightHeight {
		return leftHeight + 1 // @step:update-height
	}
	return rightHeight + 1 // @step:update-height
}

func isBalancedTree(root *TreeNode) bool {
	return checkHeight(root) != -1 // @step:complete
}
