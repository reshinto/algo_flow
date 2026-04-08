// BST Recover Swapped (Recursive) — in-order detect two swapped nodes and fix
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func recoverInorder(node *BSTNode, firstViolation **BSTNode, secondViolation **BSTNode, previousNode **BSTNode) {
	if node == nil {
		return // @step:initialize
	}

	recoverInorder(node.left, firstViolation, secondViolation, previousNode) // @step:search-node

	// Check if BST property is violated at this position
	if *previousNode != nil && (*previousNode).value > node.value {
		if *firstViolation == nil {
			// First violation: previous is the first swapped node
			*firstViolation = *previousNode // @step:found
		}
		// Second violation: current is always updated to the second swapped node
		*secondViolation = node // @step:found
	}

	*previousNode = node
	recoverInorder(node.right, firstViolation, secondViolation, previousNode) // @step:search-node
}

func bstRecoverSwapped(root *BSTNode) {
	var firstViolation *BSTNode  // @step:initialize
	var secondViolation *BSTNode
	var previousNode *BSTNode

	recoverInorder(root, &firstViolation, &secondViolation, &previousNode)

	// Swap the values of the two misplaced nodes to recover the BST
	if firstViolation != nil && secondViolation != nil {
		firstViolation.value, secondViolation.value = secondViolation.value, firstViolation.value // @step:complete
	}
}
