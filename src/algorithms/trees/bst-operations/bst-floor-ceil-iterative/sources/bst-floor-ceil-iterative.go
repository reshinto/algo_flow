// BST Floor & Ceil (Iterative) — while loop, track best floor/ceil candidates
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

func bstFloorCeilIterative(root *BSTNode, target int) FloorCeilResult {
	var floorValue *int // @step:initialize
	var ceilValue *int
	current := root

	for current != nil {
		if current.value == target {
			// Exact match is both floor and ceil
			val := current.value
			return FloorCeilResult{floor: &val, ceil: &val} // @step:found
		}

		if target < current.value {
			// Current node is a ceil candidate — go left for smaller ceil
			val := current.value
			ceilValue = &val    // @step:search-node
			current = current.left
		} else {
			// Current node is a floor candidate — go right for larger floor
			val := current.value
			floorValue = &val    // @step:search-node
			current = current.right
		}
	}

	return FloorCeilResult{floor: floorValue, ceil: ceilValue} // @step:complete
}
