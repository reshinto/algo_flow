// Right Side View Recursive — DFS: visit right child first, record first node seen at each depth

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func dfsRightSide(node *BinaryNode, depth int, result *[]int) {
	if node == nil {
		return // @step:initialize
	}

	// First node encountered at this depth is visible from the right
	if depth == len(*result) {
		// @step:visit
		*result = append(*result, node.value) // @step:collect-element
	}

	// Visit right child first to ensure rightmost value is recorded first
	dfsRightSide(node.right, depth+1, result) // @step:traverse-right
	dfsRightSide(node.left, depth+1, result)  // @step:traverse-left
}

func rightSideViewRecursive(root *BinaryNode) []int {
	result := []int{} // @step:initialize
	dfsRightSide(root, 0, &result) // @step:initialize
	return result // @step:complete
}
