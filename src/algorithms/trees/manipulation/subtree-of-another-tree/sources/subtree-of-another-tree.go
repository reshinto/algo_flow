// Subtree of Another Tree — recursive: for each node in main tree, check if subtree matches

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func isSameTree(treeA *BinaryNode, treeB *BinaryNode) bool {
	if treeA == nil && treeB == nil {
		return true
	}
	if treeA == nil || treeB == nil {
		return false
	}
	if treeA.value != treeB.value {
		return false
	}
	return isSameTree(treeA.left, treeB.left) && isSameTree(treeA.right, treeB.right)
}

func subtreeOfAnotherTree(mainTree *BinaryNode, subTree *BinaryNode) bool {
	if subTree == nil {
		return true // @step:initialize
	}
	if mainTree == nil {
		return false // @step:initialize
	}

	// Check if the tree rooted at mainTree matches subTree
	if isSameTree(mainTree, subTree) {
		return true // @step:compare
	}

	// Recursively check left and right subtrees
	return subtreeOfAnotherTree(mainTree.left, subTree) || // @step:traverse-left
		subtreeOfAnotherTree(mainTree.right, subTree) // @step:traverse-right
}
