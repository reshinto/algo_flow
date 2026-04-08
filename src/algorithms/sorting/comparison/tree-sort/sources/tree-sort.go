// Tree Sort — insert all elements into a Binary Search Tree, then extract via inorder traversal
package main

type BstNode struct {
	value int
	left  *BstNode
	right *BstNode
}

func createBstNode(value int) *BstNode {
	return &BstNode{value: value, left: nil, right: nil}
}

func insertBstNode(root *BstNode, value int) *BstNode {
	// @step:insert
	if root == nil {
		return createBstNode(value) // @step:insert
	}

	if value < root.value {
		// @step:compare
		root.left = insertBstNode(root.left, value) // @step:insert
	} else {
		root.right = insertBstNode(root.right, value) // @step:insert
	}

	return root // @step:insert
}

func inorderTraversal(root *BstNode, result *[]int) {
	// @step:extract
	if root == nil {
		return // @step:extract
	}

	inorderTraversal(root.left, result)      // @step:extract
	*result = append(*result, root.value)    // @step:mark-sorted
	inorderTraversal(root.right, result)     // @step:extract
}

func treeSort(inputArray []int) []int {
	// @step:initialize
	arrayLength := len(inputArray) // @step:initialize

	if arrayLength == 0 {
		return []int{} // @step:complete
	}

	var treeRoot *BstNode // @step:initialize

	// Insert each element into the BST
	for insertIndex := 0; insertIndex < arrayLength; insertIndex++ {
		// @step:insert
		treeRoot = insertBstNode(treeRoot, inputArray[insertIndex]) // @step:insert
	}

	// Extract sorted order via inorder traversal
	sortedArray := []int{}                     // @step:extract
	inorderTraversal(treeRoot, &sortedArray)   // @step:extract

	// @step:mark-sorted
	return sortedArray // @step:complete
}
