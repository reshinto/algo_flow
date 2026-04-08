// Vertical-Order Traversal — BFS grouping nodes by vertical column index

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

type queueEntry struct {
	node   *BSTNode
	column int
}

func verticalOrderTraversal(root *BSTNode) [][]int {
	result := [][]int{} // @step:initialize
	if root == nil {
		return result // @step:initialize
	}

	// Queue stores [node, column] pairs
	queue := []queueEntry{{node: root, column: 0}} // @step:initialize
	columnMap := map[int][]int{}                    // @step:initialize
	minColumn := 0                                  // @step:initialize
	maxColumn := 0                                  // @step:initialize

	for len(queue) > 0 {
		// @step:enqueue-node
		entry := queue[0]  // @step:dequeue-node
		queue = queue[1:]
		node := entry.node     // @step:dequeue-node
		column := entry.column // @step:dequeue-node

		// Record this node's value in its column
		columnMap[column] = append(columnMap[column], node.value) // @step:visit

		if column < minColumn {
			minColumn = column // @step:visit
		}
		if column > maxColumn {
			maxColumn = column // @step:visit
		}

		if node.left != nil {
			// @step:enqueue-node
			queue = append(queue, queueEntry{node: node.left, column: column - 1}) // @step:enqueue-node
		}
		if node.right != nil {
			// @step:enqueue-node
			queue = append(queue, queueEntry{node: node.right, column: column + 1}) // @step:enqueue-node
		}
	}

	// Collect columns in order from leftmost to rightmost
	for col := minColumn; col <= maxColumn; col++ {
		// @step:visit
		if values, ok := columnMap[col]; ok {
			result = append(result, values) // @step:visit
		}
	}

	return result // @step:complete
}
