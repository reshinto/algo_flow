// Morris In-Order Traversal — O(1) space in-order traversal using temporary threading

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func morrisInorderTraversal(root *BSTNode) []int {
	result := []int{}    // @step:initialize
	current := root      // @step:initialize

	for current != nil {
		// @step:initialize
		if current.left == nil {
			// @step:visit
			// No left child — visit current and move right
			result = append(result, current.value) // @step:visit
			current = current.right                // @step:traverse-right
		} else {
			// Find the inorder predecessor (rightmost node in left subtree)
			predecessor := current.left // @step:thread-node
			for predecessor.right != nil && predecessor.right != current {
				// @step:thread-node
				predecessor = predecessor.right // @step:thread-node
			}

			if predecessor.right == nil {
				// @step:thread-node
				// Thread: make predecessor point back to current
				predecessor.right = current // @step:thread-node
				current = current.left      // @step:traverse-left
			} else {
				// Unthread: restore predecessor's right, visit current, move right
				predecessor.right = nil                        // @step:unthread-node
				result = append(result, current.value)         // @step:visit
				current = current.right                        // @step:traverse-right
			}
		}
	}

	return result // @step:complete
}
