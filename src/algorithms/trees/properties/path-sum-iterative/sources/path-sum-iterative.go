// Path Sum (Iterative) — stack-based DFS with running sum tracking

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

type stackEntry struct {
	node       *TreeNode
	runningSum int
}

func pathSumIterative(root *TreeNode, targetSum int) bool {
	if root == nil {
		return false // @step:initialize
	}

	nodeStack := []stackEntry{{node: root, runningSum: root.value}} // @step:initialize

	for len(nodeStack) > 0 {
		// @step:visit
		entry := nodeStack[len(nodeStack)-1]   // @step:visit
		nodeStack = nodeStack[:len(nodeStack)-1]
		current := entry.node       // @step:visit
		runningSum := entry.runningSum // @step:visit

		// Leaf node — check if path sum matches target
		if current.left == nil && current.right == nil {
			// @step:check-balance
			if runningSum == targetSum {
				return true // @step:complete
			}
		}

		if current.right != nil {
			// @step:traverse-right
			nodeStack = append(nodeStack, stackEntry{node: current.right, runningSum: runningSum + current.right.value}) // @step:traverse-right
		}

		if current.left != nil {
			// @step:traverse-left
			nodeStack = append(nodeStack, stackEntry{node: current.left, runningSum: runningSum + current.left.value}) // @step:traverse-left
		}
	}

	return false // @step:complete
}
