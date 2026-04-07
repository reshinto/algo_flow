// Minimum Depth of Binary Tree — recursive DFS to nearest leaf

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func minimumDepth(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	// If only right child exists, recurse right
	if root.left == nil && root.right != nil {
		// @step:visit
		return minimumDepth(root.right) + 1 // @step:traverse-right
	}

	// If only left child exists, recurse left
	if root.right == nil && root.left != nil {
		// @step:visit
		return minimumDepth(root.left) + 1 // @step:traverse-left
	}

	// If leaf node, depth is 1
	if root.left == nil && root.right == nil {
		// @step:visit
		return 1 // @step:update-height
	}

	// Both children exist — take minimum
	leftDepth := minimumDepth(root.left)   // @step:traverse-left
	rightDepth := minimumDepth(root.right) // @step:traverse-right
	if leftDepth < rightDepth {
		return leftDepth + 1 // @step:update-height
	}
	return rightDepth + 1 // @step:update-height
}
