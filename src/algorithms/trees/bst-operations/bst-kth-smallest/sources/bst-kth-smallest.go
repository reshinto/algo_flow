// BST Kth Smallest (Recursive) — in-order traversal with counter, stop at k
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func kthInorder(node *BSTNode, kthPosition int, counter *int, result *int) {
	if node == nil || *counter >= kthPosition {
		return // @step:initialize
	}

	// Visit left subtree first (smaller values)
	kthInorder(node.left, kthPosition, counter, result) // @step:search-node

	// Visit current node — increment counter
	*counter++
	if *counter == kthPosition {
		*result = node.value // @step:found
		return
	}

	// Visit right subtree (larger values)
	kthInorder(node.right, kthPosition, counter, result) // @step:search-node
}

func bstKthSmallest(root *BSTNode, kthPosition int) int {
	counter := 0 // @step:initialize
	result := -1

	kthInorder(root, kthPosition, &counter, &result)
	return result // @step:complete
}
