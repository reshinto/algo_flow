// Binary Tree Pruning — remove all subtrees containing no 1s (post-order)
package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func binaryTreePruning(root *BinaryNode) *BinaryNode {
	if root == nil {
		return nil // @step:initialize
	}

	// Post-order: prune children first, then decide current node
	root.left = binaryTreePruning(root.left)   // @step:traverse-left
	root.right = binaryTreePruning(root.right) // @step:traverse-right

	// If this leaf has value 0, prune it
	if root.value == 0 && root.left == nil && root.right == nil {
		return nil // @step:detach-node
	}

	return root // @step:visit
}
