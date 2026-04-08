// Build Binary Tree from Postorder + Inorder (Iterative with Stack)
// Processes postorder right-to-left; uses inorder (processed right-to-left too)
// to determine when to switch from right-child insertion to left-child insertion.

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func buildFromPostorderInorderIterative(postorder []int, inorder []int) *TreeNode {
	if len(postorder) == 0 {
		return nil // @step:initialize
	}

	lastValue := postorder[len(postorder)-1] // @step:initialize
	root := &TreeNode{value: lastValue}      // @step:build-node
	stack := []*TreeNode{root}               // @step:initialize
	inorderPointer := len(inorder) - 1       // @step:initialize

	for postorderPointer := len(postorder) - 2; postorderPointer >= 0; postorderPointer-- {
		// @step:select-element
		currentValue := postorder[postorderPointer] // @step:select-element

		parentNode := stack[len(stack)-1]                   // @step:search-node
		newNode := &TreeNode{value: currentValue}           // @step:build-node

		// If stack top differs from current inorder pointer, insert as right child
		if parentNode.value != inorder[inorderPointer] {
			parentNode.right = newNode // @step:connect-child
		} else {
			// Pop nodes matching inorder (right-to-left) to find left-child parent
			for len(stack) > 0 && stack[len(stack)-1].value == inorder[inorderPointer] {
				// @step:partition-array
				parentNode = stack[len(stack)-1] // @step:partition-array
				stack = stack[:len(stack)-1]
				inorderPointer-- // @step:partition-array
			}
			parentNode.left = newNode // @step:connect-child
		}

		stack = append(stack, newNode) // @step:visit
	}

	return root // @step:visit
}
