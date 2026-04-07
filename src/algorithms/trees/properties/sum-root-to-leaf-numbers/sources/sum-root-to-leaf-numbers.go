// Sum Root to Leaf Numbers — recursive: treat root-to-leaf paths as numbers, sum them

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func dfs(node *TreeNode, runningNumber int) int {
	if node == nil {
		return 0 // @step:initialize
	}

	currentNumber := runningNumber*10 + node.value // @step:compute-value

	// Leaf node — this path forms a complete number
	if node.left == nil && node.right == nil {
		// @step:visit
		return currentNumber // @step:add-to-result
	}

	leftSum := dfs(node.left, currentNumber)   // @step:traverse-left
	rightSum := dfs(node.right, currentNumber) // @step:traverse-right
	return leftSum + rightSum                  // @step:compute-value
}

func sumRootToLeafNumbers(root *TreeNode) int {
	return dfs(root, 0) // @step:complete
}
