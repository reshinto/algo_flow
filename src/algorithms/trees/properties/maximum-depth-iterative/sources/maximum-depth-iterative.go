// Maximum Depth of Binary Tree — BFS level counting with a queue

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func maximumDepthIterative(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	queue := []*TreeNode{root} // @step:initialize
	depth := 0                  // @step:initialize

	for len(queue) > 0 {
		// @step:visit
		levelSize := len(queue) // @step:visit
		depth++                 // @step:update-height

		// Process all nodes at the current level
		for nodeIndex := 0; nodeIndex < levelSize; nodeIndex++ {
			// @step:visit
			current := queue[0] // @step:visit
			queue = queue[1:]
			if current.left != nil {
				queue = append(queue, current.left) // @step:traverse-left
			}
			if current.right != nil {
				queue = append(queue, current.right) // @step:traverse-right
			}
		}
	}

	return depth // @step:complete
}
