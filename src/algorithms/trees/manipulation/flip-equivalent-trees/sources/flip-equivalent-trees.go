// Flip Equivalent Trees — recursive: trees are flip-equivalent if children match or are swapped

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func flipEquivalentTrees(treeA *BinaryNode, treeB *BinaryNode) bool {
	if treeA == nil && treeB == nil {
		return true // @step:initialize
	}
	if treeA == nil || treeB == nil {
		return false // @step:compare
	}
	if treeA.value != treeB.value {
		return false // @step:compare
	}

	// Check if children match without flipping
	noFlip := // @step:traverse-left
		flipEquivalentTrees(treeA.left, treeB.left) && // @step:traverse-left
			flipEquivalentTrees(treeA.right, treeB.right) // @step:traverse-right

	// Check if children match with flipping
	withFlip := // @step:traverse-left
		flipEquivalentTrees(treeA.left, treeB.right) && // @step:traverse-left
			flipEquivalentTrees(treeA.right, treeB.left) // @step:traverse-right

	return noFlip || withFlip // @step:visit
}
