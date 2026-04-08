// Minimum Depth of Binary Tree — BFS returns depth at first leaf encountered

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

func minimumDepthIterative(root *TreeNode) int {
	if root == nil {
		return 0 // @step:initialize
	}

	queue := []*TreeNode{root} // @step:initialize
	depth := 0                  // @step:initialize

	for len(queue) > 0 {
		// @step:visit
		levelSize := len(queue) // @step:visit
		depth++                 // @step:update-height

		for nodeIndex := 0; nodeIndex < levelSize; nodeIndex++ {
			// @step:visit
			current := queue[0] // @step:visit
			queue = queue[1:]

			// First leaf node encountered is the minimum depth
			if current.left == nil && current.right == nil {
				// @step:visit
				return depth // @step:complete
			}

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
