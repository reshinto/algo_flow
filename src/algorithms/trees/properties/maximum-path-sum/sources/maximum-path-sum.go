// Maximum Path Sum — recursive: at each node compute max path through it, track global max

package main

import "math"

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func maximumPathSum(root *TreeNode) int {
	globalMax := math.MinInt32
	if root != nil {
		globalMax = root.value // @step:initialize
	}

	var maxGain func(node *TreeNode) int
	maxGain = func(node *TreeNode) int {
		if node == nil {
			return 0 // @step:initialize
		}

		// Only include subtree if it contributes positively
		leftGain := maxGain(node.left) // @step:traverse-left
		if leftGain < 0 {
			leftGain = 0
		}
		rightGain := maxGain(node.right) // @step:traverse-right
		if rightGain < 0 {
			rightGain = 0
		}

		// Path through this node: left branch + node value + right branch
		pathThroughNode := node.value + leftGain + rightGain // @step:compute-value
		if pathThroughNode > globalMax {
			globalMax = pathThroughNode // @step:update-height
		}

		// Return max gain if we continue from this node to parent
		if leftGain > rightGain {
			return node.value + leftGain // @step:add-to-result
		}
		return node.value + rightGain // @step:add-to-result
	}

	maxGain(root) // @step:initialize
	return globalMax // @step:complete
}
