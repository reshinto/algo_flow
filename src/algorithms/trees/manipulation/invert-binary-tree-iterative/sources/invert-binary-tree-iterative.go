// Invert Binary Tree Iterative — BFS with queue: swap children level by level

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func invertBinaryTreeIterative(root *BinaryNode) *BinaryNode {
	if root == nil {
		return nil // @step:initialize
	}

	queue := []*BinaryNode{root} // @step:initialize

	for len(queue) > 0 {
		// @step:initialize
		current := queue[0]  // @step:dequeue
		queue = queue[1:]

		// Swap left and right children
		temp := current.left         // @step:swap-children
		current.left = current.right // @step:swap-children
		current.right = temp         // @step:swap-children

		// Enqueue non-null children for processing
		if current.left != nil {
			queue = append(queue, current.left) // @step:enqueue
		}
		if current.right != nil {
			queue = append(queue, current.right) // @step:enqueue
		}
	}

	return root // @step:complete
}
