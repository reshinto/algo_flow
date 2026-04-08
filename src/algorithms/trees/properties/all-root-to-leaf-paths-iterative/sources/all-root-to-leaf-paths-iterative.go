// All Root-to-Leaf Paths (Iterative) — stack-based with path tracking

package main

import (
	"fmt"
	"strconv"
)

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

type stackEntry struct {
	node        *TreeNode
	pathSoFar   string
}

func allRootToLeafPathsIterative(root *TreeNode) []string {
	if root == nil {
		return []string{} // @step:initialize
	}

	paths := []string{} // @step:initialize
	stack := []stackEntry{ // @step:initialize
		{root, strconv.Itoa(root.value)},
	}

	for len(stack) > 0 {
		// @step:visit
		entry := stack[len(stack)-1] // @step:visit
		stack = stack[:len(stack)-1]
		current := entry.node
		pathSoFar := entry.pathSoFar

		// Leaf node — record complete path
		if current.left == nil && current.right == nil {
			// @step:check-balance
			paths = append(paths, pathSoFar) // @step:add-to-result
		}

		if current.right != nil {
			// @step:traverse-right
			stack = append(stack, stackEntry{current.right, fmt.Sprintf("%s->%d", pathSoFar, current.right.value)}) // @step:traverse-right
		}

		if current.left != nil {
			// @step:traverse-left
			stack = append(stack, stackEntry{current.left, fmt.Sprintf("%s->%d", pathSoFar, current.left.value)}) // @step:traverse-left
		}
	}

	return paths // @step:complete
}
