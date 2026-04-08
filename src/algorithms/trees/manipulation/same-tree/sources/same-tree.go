// Same Tree — recursive: check structural equality and value equality

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func sameTree(treeA *BinaryNode, treeB *BinaryNode) bool {
	if treeA == nil && treeB == nil {
		return true // @step:initialize
	}
	if treeA == nil || treeB == nil {
		return false // @step:compare
	}
	if treeA.value != treeB.value {
		return false // @step:compare
	}

	// Recursively check left and right subtrees
	leftMatch := sameTree(treeA.left, treeB.left)   // @step:traverse-left
	rightMatch := sameTree(treeA.right, treeB.right) // @step:traverse-right

	return leftMatch && rightMatch // @step:visit
}
