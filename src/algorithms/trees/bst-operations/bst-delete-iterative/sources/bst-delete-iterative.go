// BST Delete (Iterative) — 3 cases using while loop with parent tracking
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstDeleteIterative(root *BSTNode, deleteValue int) *BSTNode {
	var parent *BSTNode // @step:initialize
	current := root

	// Find the node to delete and its parent
	for current != nil && current.value != deleteValue {
		parent = current
		if deleteValue < current.value {
			current = current.left // @step:search-node
		} else {
			current = current.right // @step:search-node
		}
	}

	if current == nil {
		return root // @step:complete — value not found
	}

	// Case: node has two children — replace with inorder successor
	if current.left != nil && current.right != nil {
		successorParent := current
		successor := current.right
		for successor.left != nil {
			successorParent = successor
			successor = successor.left // @step:search-node
		}
		current.value = successor.value // @step:delete-child
		current = successor
		parent = successorParent
	}

	// Case: node has 0 or 1 child
	var child *BSTNode
	if current.left != nil {
		child = current.left
	} else {
		child = current.right
	}

	if parent == nil {
		return child // @step:delete-child — deleting root
	}

	if parent.left == current {
		parent.left = child // @step:delete-child
	} else {
		parent.right = child // @step:delete-child
	}

	return root // @step:complete
}
