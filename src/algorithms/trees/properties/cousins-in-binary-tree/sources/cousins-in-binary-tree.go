// Cousins in Binary Tree — BFS: check if two nodes are at same depth with different parents

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

type bfsEntry struct {
	node         *TreeNode
	parent       *TreeNode
	currentDepth int
}

func cousinsInBinaryTree(root *TreeNode, nodeValueA int, nodeValueB int) bool {
	if root == nil {
		return false // @step:initialize
	}

	queue := []bfsEntry{{root, nil, 0}} // @step:initialize

	var parentA *TreeNode // @step:initialize
	var parentB *TreeNode // @step:initialize
	depthA := -1          // @step:initialize
	depthB := -1          // @step:initialize

	for len(queue) > 0 {
		// @step:visit
		entry := queue[0] // @step:visit
		queue = queue[1:]
		current := entry.node
		parent := entry.parent
		currentDepth := entry.currentDepth

		if current.value == nodeValueA {
			// @step:check-balance
			parentA = parent       // @step:check-balance
			depthA = currentDepth  // @step:update-height
		}

		if current.value == nodeValueB {
			// @step:check-balance
			parentB = parent       // @step:check-balance
			depthB = currentDepth  // @step:update-height
		}

		if current.left != nil {
			queue = append(queue, bfsEntry{current.left, current, currentDepth + 1}) // @step:traverse-left
		}
		if current.right != nil {
			queue = append(queue, bfsEntry{current.right, current, currentDepth + 1}) // @step:traverse-right
		}
	}

	// Cousins: same depth, different parents
	return depthA == depthB && parentA != parentB // @step:complete
}
