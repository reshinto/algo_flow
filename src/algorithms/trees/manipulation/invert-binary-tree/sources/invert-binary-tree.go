// Invert Binary Tree — recursive: swap left and right children at every node

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func invertBinaryTree(root *BinaryNode) *BinaryNode {
	if root == nil {
		return nil // @step:initialize
	}

	// Recursively invert the left subtree
	invertedLeft := invertBinaryTree(root.left) // @step:traverse-left
	// Recursively invert the right subtree
	invertedRight := invertBinaryTree(root.right) // @step:traverse-right

	// Swap left and right children
	root.left = invertedRight // @step:swap-children
	root.right = invertedLeft // @step:swap-children

	return root // @step:visit
}
