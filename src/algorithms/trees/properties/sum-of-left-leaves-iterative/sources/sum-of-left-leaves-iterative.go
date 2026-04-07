// Sum of Left Leaves (Iterative) — stack-based DFS checking left leaf condition

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

type stackEntry struct {
	node   *TreeNode
	isLeft bool
}

func sumOfLeftLeavesIterative(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	nodeStack := []stackEntry{{node: root, isLeft: false}} // @step:initialize
	totalSum := 0                                           // @step:initialize

	for len(nodeStack) > 0 {
		// @step:visit
		entry := nodeStack[len(nodeStack)-1]    // @step:visit
		nodeStack = nodeStack[:len(nodeStack)-1]
		current := entry.node   // @step:visit
		isLeft := entry.isLeft  // @step:visit

		// Accumulate value when we find a left leaf
		if current.left == nil && current.right == nil && isLeft {
			// @step:check-balance
			totalSum += current.value // @step:add-to-result
		}

		if current.right != nil {
			// @step:traverse-right
			nodeStack = append(nodeStack, stackEntry{node: current.right, isLeft: false}) // @step:traverse-right
		}

		if current.left != nil {
			// @step:traverse-left
			nodeStack = append(nodeStack, stackEntry{node: current.left, isLeft: true}) // @step:traverse-left
		}
	}

	return totalSum // @step:complete
}
