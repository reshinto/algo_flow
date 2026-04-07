// Sum Root to Leaf Numbers (Iterative) — stack-based number formation

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

type stackEntry struct {
	node          *TreeNode
	runningNumber int
}

func sumRootToLeafNumbersIterative(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	totalSum := 0 // @step:initialize
	nodeStack := []stackEntry{{node: root, runningNumber: root.value}} // @step:initialize

	for len(nodeStack) > 0 {
		// @step:visit
		entry := nodeStack[len(nodeStack)-1]     // @step:visit
		nodeStack = nodeStack[:len(nodeStack)-1]
		current := entry.node           // @step:visit
		runningNumber := entry.runningNumber // @step:visit

		// Leaf node — add completed number to total
		if current.left == nil && current.right == nil {
			// @step:check-balance
			totalSum += runningNumber // @step:add-to-result
		}

		if current.right != nil {
			// @step:traverse-right
			nodeStack = append(nodeStack, stackEntry{node: current.right, runningNumber: runningNumber*10 + current.right.value}) // @step:traverse-right
		}

		if current.left != nil {
			// @step:traverse-left
			nodeStack = append(nodeStack, stackEntry{node: current.left, runningNumber: runningNumber*10 + current.left.value}) // @step:traverse-left
		}
	}

	return totalSum // @step:complete
}
