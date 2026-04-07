// Cartesian Tree Sort — build a min-heap Cartesian tree, then repeatedly extract the minimum root
package main

type CartesianNode struct {
	value      int
	leftChild  *CartesianNode
	rightChild *CartesianNode
}

func mergeCartesianTrees(leftTree *CartesianNode, rightTree *CartesianNode) *CartesianNode {
	if leftTree == nil {
		return rightTree // @step:extract
	}
	if rightTree == nil {
		return leftTree // @step:extract
	}

	if leftTree.value <= rightTree.value {
		// @step:compare
		leftTree.rightChild = mergeCartesianTrees(leftTree.rightChild, rightTree) // @step:extract
		return leftTree                                                            // @step:extract
	} else {
		rightTree.leftChild = mergeCartesianTrees(leftTree, rightTree.leftChild) // @step:extract
		return rightTree                                                          // @step:extract
	}
}

func cartesianTreeSort(inputArray []int) []int {
	// @step:initialize
	arrayLength := len(inputArray) // @step:initialize
	if arrayLength == 0 {
		return []int{} // @step:initialize
	}

	// Build the Cartesian tree using a stack-based O(n) construction
	// @step:build-tree
	nodeStack := []*CartesianNode{} // @step:build-tree

	for buildIndex := 0; buildIndex < arrayLength; buildIndex++ {
		newNode := &CartesianNode{ // @step:compare
			value:      inputArray[buildIndex], // @step:compare
			leftChild:  nil,                    // @step:compare
			rightChild: nil,                    // @step:compare
		}

		// Pop nodes from the stack that are larger than the new node (min-heap property)
		var lastPopped *CartesianNode = nil // @step:swap
		for len(nodeStack) > 0 && nodeStack[len(nodeStack)-1].value > newNode.value {
			// @step:swap
			lastPopped = nodeStack[len(nodeStack)-1]  // @step:swap
			nodeStack = nodeStack[:len(nodeStack)-1]  // @step:swap
		}
		newNode.leftChild = lastPopped // @step:swap
		if len(nodeStack) > 0 {
			nodeStack[len(nodeStack)-1].rightChild = newNode // @step:swap
		}
		nodeStack = append(nodeStack, newNode) // @step:swap
	}

	// The root of the tree is the leftmost element in the stack (minimum value)
	var treeRoot *CartesianNode = nil // @step:build-tree
	if len(nodeStack) > 0 {
		treeRoot = nodeStack[0] // @step:build-tree
	}

	// Repeatedly extract the minimum (root) and merge its two subtrees
	resultArray := []int{} // @step:extract

	for treeRoot != nil {
		resultArray = append(resultArray, treeRoot.value) // @step:mark-sorted

		// Merge left and right subtrees to form the new tree without the extracted root
		treeRoot = mergeCartesianTrees(treeRoot.leftChild, treeRoot.rightChild) // @step:extract
	}

	return resultArray // @step:complete
}
