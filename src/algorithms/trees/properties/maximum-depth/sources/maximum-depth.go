// Maximum Depth of Binary Tree — recursive DFS returning max(left, right) + 1

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func maximumDepth(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	// Recursively compute depth of left and right subtrees
	leftDepth := maximumDepth(root.left)   // @step:traverse-left
	rightDepth := maximumDepth(root.right) // @step:traverse-right

	// Return the larger subtree depth plus 1 for the current node
	if leftDepth > rightDepth {
		return leftDepth + 1 // @step:update-height
	}
	return rightDepth + 1 // @step:update-height
}
