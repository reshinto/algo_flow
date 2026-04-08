// BST Search (Recursive) — compare target, recurse left or right
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstSearch(root *BSTNode, target int) *BSTNode {
	if root == nil {
		return nil // @step:initialize
	}
	if root.value == target {
		return root // @step:found
	}

	if target < root.value {
		// Target is smaller — search the left subtree
		return bstSearch(root.left, target) // @step:search-node
	} else {
		// Target is larger — search the right subtree
		return bstSearch(root.right, target) // @step:search-node
	}
}
