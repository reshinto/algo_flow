// BST Lowest Common Ancestor (Iterative) — while loop split point search
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstLowestCommonAncestorIterative(root *BSTNode, nodeValueA int, nodeValueB int) *BSTNode {
	current := root // @step:initialize

	for current != nil {
		if nodeValueA < current.value && nodeValueB < current.value {
			// Both values are smaller — move to left subtree
			current = current.left // @step:search-node
		} else if nodeValueA > current.value && nodeValueB > current.value {
			// Both values are larger — move to right subtree
			current = current.right // @step:search-node
		} else {
			// Values split across current (or one equals current) — found LCA
			return current // @step:found
		}
	}

	return nil // @step:complete
}
