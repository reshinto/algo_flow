// BST to Greater Tree (Recursive) — reverse in-order: accumulate running sum
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func greaterTreeReverseInorder(node *BSTNode, runningSum *int) {
	if node == nil {
		return // @step:initialize
	}

	// Visit right subtree first (larger values in descending order)
	greaterTreeReverseInorder(node.right, runningSum) // @step:search-node

	// Add current node's value to running sum, then update node
	*runningSum += node.value // @step:found
	node.value = *runningSum

	// Visit left subtree (smaller values)
	greaterTreeReverseInorder(node.left, runningSum) // @step:search-node
}

func bstToGreaterTree(root *BSTNode) *BSTNode {
	runningSum := 0 // @step:initialize

	greaterTreeReverseInorder(root, &runningSum)
	return root // @step:complete
}
