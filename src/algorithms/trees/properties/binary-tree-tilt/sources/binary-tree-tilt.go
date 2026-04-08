// Binary Tree Tilt — post-order: tilt = abs(left sum - right sum), accumulate total tilt

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func subtreeSum(node *TreeNode, totalTilt *int) int {
	if node == nil {
		return 0 // @step:initialize
	}

	leftSum := subtreeSum(node.left, totalTilt)   // @step:traverse-left
	rightSum := subtreeSum(node.right, totalTilt) // @step:traverse-right

	// Tilt at this node is absolute difference of left and right sums
	nodeTilt := leftSum - rightSum
	if nodeTilt < 0 {
		nodeTilt = -nodeTilt
	} // @step:compute-value
	*totalTilt += nodeTilt // @step:add-to-result

	return leftSum + rightSum + node.value // @step:update-height
}

func binaryTreeTilt(root *TreeNode) int {
	totalTilt := 0             // @step:initialize
	subtreeSum(root, &totalTilt) // @step:initialize
	return totalTilt           // @step:complete
}
