// Flatten Binary Tree to Linked List Iterative — Morris-like: find rightmost of left subtree and rewire

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func flattenToLinkedListIterative(root *BinaryNode) {
	current := root // @step:initialize

	for current != nil {
		// @step:visit
		if current.left != nil {
			// @step:visit
			// Find the rightmost node of the left subtree
			rightmost := current.left // @step:connect-child
			for rightmost.right != nil {
				// @step:connect-child
				rightmost = rightmost.right // @step:connect-child
			}

			// Attach original right subtree at the rightmost node
			rightmost.right = current.right // @step:connect-child

			// Move left subtree to right, clear left pointer
			current.right = current.left // @step:connect-child
			current.left = nil           // @step:connect-child
		}

		current = current.right // @step:visit
	}
}
