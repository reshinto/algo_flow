// Flatten Binary Tree to Linked List — recursive preorder: rewire nodes in-place

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func flattenToLinkedList(root *BinaryNode) {
	if root == nil {
		return // @step:initialize
	}

	// Recursively flatten the left and right subtrees
	flattenToLinkedList(root.left)   // @step:traverse-left
	flattenToLinkedList(root.right)  // @step:traverse-right

	// Save the original right subtree
	rightSubtree := root.right // @step:connect-child

	// Move the left subtree to the right
	root.right = root.left // @step:connect-child
	root.left = nil        // @step:connect-child

	// Find the rightmost node of the newly-placed subtree
	current := root
	for current.right != nil {
		// @step:visit
		current = current.right // @step:visit
	}

	// Attach the original right subtree at the tail
	current.right = rightSubtree // @step:connect-child
}
