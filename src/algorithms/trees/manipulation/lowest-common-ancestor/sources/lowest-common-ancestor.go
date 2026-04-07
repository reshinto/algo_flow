// Lowest Common Ancestor — recursive post-order: for general binary tree (not BST)

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func lowestCommonAncestor(root *BinaryNode, nodeValueA int, nodeValueB int) *BinaryNode {
	if root == nil {
		return nil // @step:initialize
	}
	if root.value == nodeValueA || root.value == nodeValueB {
		return root // @step:compare
	}

	// Search left and right subtrees
	leftResult := lowestCommonAncestor(root.left, nodeValueA, nodeValueB)   // @step:traverse-left
	rightResult := lowestCommonAncestor(root.right, nodeValueA, nodeValueB) // @step:traverse-right

	// If both sides found a target node, current node is the LCA
	if leftResult != nil && rightResult != nil {
		return root // @step:visit
	}

	// Otherwise return whichever side found a target node
	if leftResult != nil {
		return leftResult // @step:visit
	}
	return rightResult // @step:visit
}
