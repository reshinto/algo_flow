// Path Sum — recursive DFS: check if any root-to-leaf path sums to target

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func pathSum(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false // @step:initialize
	}

	// Leaf node — check if remaining sum equals node value
	if root.left == nil && root.right == nil {
		// @step:visit
		return root.value == targetSum // @step:check-balance
	}

	remaining := targetSum - root.value // @step:compute-value

	// Recurse on left and right subtrees
	foundLeft := pathSum(root.left, remaining) // @step:traverse-left
	if foundLeft {
		return true // @step:check-balance
	}

	foundRight := pathSum(root.right, remaining) // @step:traverse-right
	return foundRight                             // @step:complete
}
