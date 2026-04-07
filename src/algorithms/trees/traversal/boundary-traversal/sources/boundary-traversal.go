// Boundary Traversal — left boundary + leaf nodes + right boundary (counterclockwise)

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func isLeaf(node *BSTNode) bool {
	return node.left == nil && node.right == nil
}

func addLeftBoundary(node *BSTNode, result *[]int) {
	// @step:traverse-left
	if node == nil || isLeaf(node) {
		return // @step:traverse-left
	}
	*result = append(*result, node.value) // @step:traverse-left
	if node.left != nil {
		// @step:traverse-left
		addLeftBoundary(node.left, result) // @step:traverse-left
	} else {
		// @step:traverse-left
		addLeftBoundary(node.right, result) // @step:traverse-left
	}
}

func addLeaves(node *BSTNode, result *[]int) {
	// @step:visit
	if node == nil {
		return // @step:visit
	}
	if isLeaf(node) {
		// @step:visit
		*result = append(*result, node.value) // @step:visit
		return                                // @step:visit
	}
	addLeaves(node.left, result)  // @step:visit
	addLeaves(node.right, result) // @step:visit
}

func addRightBoundary(node *BSTNode, result *[]int) {
	// @step:traverse-right
	if node == nil || isLeaf(node) {
		return // @step:traverse-right
	}
	if node.right != nil {
		// @step:traverse-right
		addRightBoundary(node.right, result) // @step:traverse-right
	} else {
		// @step:traverse-right
		addRightBoundary(node.left, result) // @step:traverse-right
	}
	*result = append(*result, node.value) // @step:traverse-right (added after recursion for bottom-up)
}

func boundaryTraversal(root *BSTNode) []int {
	result := []int{} // @step:initialize
	if root == nil {
		return result // @step:initialize
	}

	if !isLeaf(root) {
		result = append(result, root.value) // @step:initialize
	}

	addLeftBoundary(root.left, &result)  // @step:traverse-left
	addLeaves(root, &result)              // @step:visit
	addRightBoundary(root.right, &result) // @step:traverse-right

	return result // @step:complete
}
