// BST Insert (Recursive) — find correct leaf position and insert new node
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstInsert(root *BSTNode, insertValue int) *BSTNode {
	if root == nil {
		// Base case: insert new node at this position
		return &BSTNode{value: insertValue} // @step:insert-child
	}

	if insertValue < root.value {
		// Insert value is smaller — recurse into left subtree
		root.left = bstInsert(root.left, insertValue) // @step:search-node
	} else if insertValue > root.value {
		// Insert value is larger — recurse into right subtree
		root.right = bstInsert(root.right, insertValue) // @step:search-node
	}
	// Duplicate values are ignored

	return root // @step:complete
}
