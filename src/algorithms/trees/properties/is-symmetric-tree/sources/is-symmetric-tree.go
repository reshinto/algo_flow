// Is Symmetric Tree — recursive: compare left.left with right.right and left.right with right.left

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func isMirror(leftNode *TreeNode, rightNode *TreeNode) bool {
	if leftNode == nil && rightNode == nil {
		return true // @step:check-balance
	}
	if leftNode == nil || rightNode == nil {
		return false // @step:check-balance
	}
	if leftNode.value != rightNode.value {
		return false // @step:check-balance
	}

	// Outer pair and inner pair must both be mirrors
	outerMatch := isMirror(leftNode.left, rightNode.right)  // @step:traverse-left
	innerMatch := isMirror(leftNode.right, rightNode.left)  // @step:traverse-right
	return outerMatch && innerMatch                          // @step:check-balance
}

func isSymmetricTree(root *TreeNode) bool {
	if root == nil {
		return true // @step:initialize
	}

	return isMirror(root.left, root.right) // @step:complete
}
