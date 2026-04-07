// Sum of Left Leaves — recursive: sum values of all left leaf nodes

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func dfs(node *TreeNode, isLeft bool) int {
	if node == nil {
		return 0 // @step:initialize
	}

	// Left leaf node contributes its value
	if node.left == nil && node.right == nil && isLeft {
		// @step:visit
		return node.value // @step:add-to-result
	}

	leftSum := dfs(node.left, true)    // @step:traverse-left
	rightSum := dfs(node.right, false) // @step:traverse-right
	return leftSum + rightSum          // @step:compute-value
}

func sumOfLeftLeaves(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	return dfs(root, false) // @step:complete
}
