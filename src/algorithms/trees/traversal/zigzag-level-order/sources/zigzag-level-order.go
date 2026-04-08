// Zigzag Level-Order Traversal — BFS with alternating left-right direction per level

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

func zigzagLevelOrder(root *BSTNode) [][]int {
	result := [][]int{} // @step:initialize
	if root == nil {
		return result // @step:initialize
	}

	queue := []*BSTNode{root} // @step:initialize
	leftToRight := true       // @step:initialize

	for len(queue) > 0 {
		// @step:enqueue-node
		levelSize := len(queue)         // @step:enqueue-node
		currentLevel := make([]int, levelSize) // @step:enqueue-node

		for nodeIndex := 0; nodeIndex < levelSize; nodeIndex++ {
			// @step:dequeue-node
			node := queue[0] // @step:dequeue-node
			queue = queue[1:]

			// Insert at front or back based on current direction
			insertIndex := nodeIndex
			if !leftToRight {
				insertIndex = levelSize - 1 - nodeIndex // @step:visit
			}
			currentLevel[insertIndex] = node.value // @step:visit

			if node.left != nil {
				// @step:enqueue-node
				queue = append(queue, node.left) // @step:enqueue-node
			}
			if node.right != nil {
				// @step:enqueue-node
				queue = append(queue, node.right) // @step:enqueue-node
			}
		}

		result = append(result, currentLevel) // @step:visit
		leftToRight = !leftToRight            // @step:visit
	}

	return result // @step:complete
}
