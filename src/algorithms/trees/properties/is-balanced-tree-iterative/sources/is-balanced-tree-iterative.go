// Is Balanced Tree (Iterative) — bottom-up post-order using stack with height tracking

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

type stackEntry struct {
	node  *TreeNode
	phase int
}

func isBalancedTreeIterative(root *TreeNode) bool {
	if root == nil {
		return true // @step:initialize
	}

	nodeStack := []stackEntry{} // @step:initialize
	heights := map[*TreeNode]int{} // @step:initialize

	nodeStack = append(nodeStack, stackEntry{node: root, phase: 0}) // @step:initialize

	for len(nodeStack) > 0 {
		// @step:visit
		entry := &nodeStack[len(nodeStack)-1] // @step:visit
		node := entry.node                    // @step:visit

		if entry.phase == 0 {
			entry.phase = 1 // @step:visit
			if node.left != nil {
				nodeStack = append(nodeStack, stackEntry{node: node.left, phase: 0}) // @step:traverse-left
			}
		} else if entry.phase == 1 {
			entry.phase = 2 // @step:visit
			if node.right != nil {
				nodeStack = append(nodeStack, stackEntry{node: node.right, phase: 0}) // @step:traverse-right
			}
		} else {
			nodeStack = nodeStack[:len(nodeStack)-1] // @step:visit
			leftHeight := 0
			if node.left != nil {
				leftHeight = heights[node.left] // @step:check-balance
			}
			rightHeight := 0
			if node.right != nil {
				rightHeight = heights[node.right] // @step:check-balance
			}

			diff := leftHeight - rightHeight
			if diff < 0 {
				diff = -diff
			}
			if diff > 1 {
				return false // @step:check-balance
			}

			if leftHeight > rightHeight {
				heights[node] = leftHeight + 1 // @step:update-height
			} else {
				heights[node] = rightHeight + 1 // @step:update-height
			}
		}
	}

	return true // @step:complete
}
