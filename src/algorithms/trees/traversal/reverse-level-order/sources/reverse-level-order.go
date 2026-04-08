// Reverse Level-Order Traversal — BFS bottom-up: deepest level first

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func reverseLevelOrder(root *BSTNode) [][]int {
	result := [][]int{} // @step:initialize
	if root == nil {
		return result // @step:initialize
	}

	queue := []*BSTNode{root} // @step:initialize

	for len(queue) > 0 {
		// @step:enqueue-node
		levelSize := len(queue)  // @step:enqueue-node
		currentLevel := []int{}  // @step:enqueue-node

		for nodeIndex := 0; nodeIndex < levelSize; nodeIndex++ {
			// @step:dequeue-node
			node := queue[0] // @step:dequeue-node
			queue = queue[1:]
			currentLevel = append(currentLevel, node.value) // @step:visit

			if node.left != nil {
				// @step:enqueue-node
				queue = append(queue, node.left) // @step:enqueue-node
			}
			if node.right != nil {
				// @step:enqueue-node
				queue = append(queue, node.right) // @step:enqueue-node
			}
		}

		// Prepend level to get bottom-up order
		result = append([][]int{currentLevel}, result...) // @step:visit
	}

	return result // @step:complete
}
