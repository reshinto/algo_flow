// BST Floor & Ceil (Recursive) — largest value ≤ target (floor), smallest value ≥ target (ceil)
package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

type FloorCeilResult struct {
	floor *int
	ceil  *int
}

func findFloor(node *BSTNode, target int) *int {
	if node == nil {
		return nil // @step:initialize
	}
	if node.value == target {
		val := node.value
		return &val // @step:found
	}
	if target < node.value {
		// Target smaller than node — floor must be in left subtree
		return findFloor(node.left, target) // @step:search-node
	}
	// Target larger than node — this node is a candidate, check right
	rightFloor := findFloor(node.right, target) // @step:search-node
	if rightFloor != nil {
		return rightFloor
	}
	val := node.value
	return &val // @step:complete
}

func findCeil(node *BSTNode, target int) *int {
	if node == nil {
		return nil // @step:initialize
	}
	if node.value == target {
		val := node.value
		return &val // @step:found
	}
	if target > node.value {
		// Target larger than node — ceil must be in right subtree
		return findCeil(node.right, target) // @step:search-node
	}
	// Target smaller than node — this node is a candidate, check left
	leftCeil := findCeil(node.left, target) // @step:search-node
	if leftCeil != nil {
		return leftCeil
	}
	val := node.value
	return &val // @step:complete
}

func bstFloorCeil(root *BSTNode, target int) FloorCeilResult {
	return FloorCeilResult{floor: findFloor(root, target), ceil: findCeil(root, target)}
}
