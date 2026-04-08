// Build Binary Tree from Preorder + Inorder (Iterative with Stack)
// Uses a stack to simulate recursion — push nodes as we consume preorder values,
// pop when we detect a boundary via the inorder pointer.

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func buildFromPreorderInorderIterative(preorder []int, inorder []int) *TreeNode {
	if len(preorder) == 0 {
		return nil // @step:initialize
	}

	firstValue := preorder[0]              // @step:initialize
	root := &TreeNode{value: firstValue}   // @step:build-node
	stack := []*TreeNode{root}             // @step:initialize
	inorderPointer := 0                    // @step:initialize

	for preorderPointer := 1; preorderPointer < len(preorder); preorderPointer++ {
		// @step:select-element
		currentValue := preorder[preorderPointer] // @step:select-element

		parentNode := stack[len(stack)-1]         // @step:search-node
		newNode := &TreeNode{value: currentValue} // @step:build-node

		// If stack top differs from current inorder value, go left
		if parentNode.value != inorder[inorderPointer] {
			parentNode.left = newNode // @step:connect-child
		} else {
			// Pop nodes that match inorder to find the parent for right insertion
			for len(stack) > 0 && stack[len(stack)-1].value == inorder[inorderPointer] {
				// @step:partition-array
				parentNode = stack[len(stack)-1] // @step:partition-array
				stack = stack[:len(stack)-1]
				inorderPointer++ // @step:partition-array
			}
			parentNode.right = newNode // @step:connect-child
		}

		stack = append(stack, newNode) // @step:visit
	}

	return root // @step:visit
}
