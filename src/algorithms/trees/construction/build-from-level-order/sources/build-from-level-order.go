// Build BST from Level-Order Sequence
// Insert each value from the level-order array into a BST using standard BST insertion.
// The resulting tree's level-order traversal will match the input array.

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func bstInsert(current *TreeNode, value int) *TreeNode {
	// @step:initialize
	if current == nil {
		return &TreeNode{value: value} // @step:build-node
	}

	if value < current.value {
		current.left = bstInsert(current.left, value) // @step:connect-child
	} else if value > current.value {
		current.right = bstInsert(current.right, value) // @step:connect-child
	}

	return current // @step:visit
}

func buildFromLevelOrder(levelOrder []int) *TreeNode {
	if len(levelOrder) == 0 {
		return nil // @step:initialize
	}

	var root *TreeNode // @step:initialize

	for _, value := range levelOrder {
		// @step:select-element
		root = bstInsert(root, value) // @step:build-node
	}

	return root // @step:complete
}
