// BST Search (Iterative) — while loop binary search, no recursion
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func bstSearchIterative(root *BSTNode, target int) *BSTNode {
	current := root // @step:initialize

	for current != nil {
		if current.value == target {
			return current // @step:found
		}

		if target < current.value {
			// Target is smaller — move left
			current = current.left // @step:search-node
		} else {
			// Target is larger — move right
			current = current.right // @step:search-node
		}
	}

	return nil // @step:complete
}
