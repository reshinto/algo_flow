// Build Binary Tree from Preorder + Inorder Traversal (Recursive)
// First element of preorder is root; find root in inorder to split left/right subtrees

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func buildFromPreorderInorder(preorder []int, inorder []int) *TreeNode {
	if len(preorder) == 0 || len(inorder) == 0 {
		return nil // @step:initialize
	}

	rootValue := preorder[0]                    // @step:select-element
	root := &TreeNode{value: rootValue}         // @step:build-node

	inorderRootIndex := -1
	for idx, val := range inorder {
		if val == rootValue {
			inorderRootIndex = idx
			break
		}
	} // @step:partition-array

	// Left subtree uses inorder[0..inorderRootIndex-1] and corresponding preorder slice
	leftInorder := inorder[:inorderRootIndex]                    // @step:partition-array
	leftPreorder := preorder[1 : 1+len(leftInorder)]            // @step:partition-array

	// Right subtree uses inorder[inorderRootIndex+1..] and the remaining preorder elements
	rightInorder := inorder[inorderRootIndex+1:]                 // @step:partition-array
	rightPreorder := preorder[1+len(leftInorder):]               // @step:partition-array

	root.left = buildFromPreorderInorder(leftPreorder, leftInorder)   // @step:connect-child
	root.right = buildFromPreorderInorder(rightPreorder, rightInorder) // @step:connect-child

	return root // @step:visit
}
