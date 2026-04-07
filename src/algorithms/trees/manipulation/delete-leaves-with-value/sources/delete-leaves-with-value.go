// Delete Leaves With Value — post-order recursive: remove leaf if value matches target

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func deleteLeavesWithValue(root *BinaryNode, targetValue int) *BinaryNode {
	if root == nil {
		return nil // @step:initialize
	}

	// Recursively process children first (post-order)
	root.left = deleteLeavesWithValue(root.left, targetValue)   // @step:traverse-left
	root.right = deleteLeavesWithValue(root.right, targetValue) // @step:traverse-right

	// Check if the current node is now a leaf with the target value
	if root.left == nil && root.right == nil && root.value == targetValue {
		// @step:compare
		return nil // @step:delete-node
	}

	return root // @step:visit
}
