// Build Binary Tree from Postorder + Inorder Traversal (Recursive)
// Last element of postorder is root; find root in inorder to split left/right subtrees

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func buildFromPostorderInorder(postorder []int, inorder []int) *TreeNode {
	if len(postorder) == 0 || len(inorder) == 0 {
		return nil // @step:initialize
	}

	rootValue := postorder[len(postorder)-1]                          // @step:select-element
	root := &TreeNode{value: rootValue}                               // @step:build-node

	inorderRootIndex := -1
	for idx, val := range inorder {
		if val == rootValue {
			inorderRootIndex = idx
			break
		}
	} // @step:partition-array

	// Split inorder and postorder into left/right subtrees
	leftInorder := inorder[:inorderRootIndex]                        // @step:partition-array
	rightInorder := inorder[inorderRootIndex+1:]                     // @step:partition-array

	leftPostorder := postorder[:len(leftInorder)]                    // @step:partition-array
	rightPostorder := postorder[len(leftInorder) : len(postorder)-1] // @step:partition-array

	root.left = buildFromPostorderInorder(leftPostorder, leftInorder)   // @step:connect-child
	root.right = buildFromPostorderInorder(rightPostorder, rightInorder) // @step:connect-child

	return root // @step:visit
}
