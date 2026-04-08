// Diameter of Binary Tree — track max of (leftHeight + rightHeight) at each node

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func diameterOfBinaryTree(root *TreeNode) int {
	maxDiameter := 0 // @step:initialize

	var computeHeight func(node *TreeNode) int
	computeHeight = func(node *TreeNode) int {
		if node == nil {
			return 0 // @step:initialize
		}

		leftHeight := computeHeight(node.left)   // @step:traverse-left
		rightHeight := computeHeight(node.right) // @step:traverse-right

		// Update global max diameter — path through this node spans leftHeight + rightHeight edges
		if leftHeight+rightHeight > maxDiameter {
			maxDiameter = leftHeight + rightHeight // @step:update-height
		}

		if leftHeight > rightHeight {
			return leftHeight + 1 // @step:update-height
		}
		return rightHeight + 1 // @step:update-height
	}

	computeHeight(root) // @step:initialize
	return maxDiameter  // @step:complete
}
