// Diagonal Traversal — group nodes by diagonal (right = same diagonal, left = next diagonal)

package main

type BSTNode struct {
	value int
	left  *BSTNode
	right *BSTNode
}

type queueEntry struct {
	node     *BSTNode
	diagonal int
}

func treeDiagonalTraversal(root *BSTNode) [][]int {
	result := [][]int{} // @step:initialize
	if root == nil {
		return result // @step:initialize
	}

	// Queue of [node, diagonal] pairs
	queue := []queueEntry{{node: root, diagonal: 0}} // @step:initialize
	diagonalMap := map[int][]int{}                    // @step:initialize
	maxDiagonal := 0                                  // @step:initialize

	for len(queue) > 0 {
		// @step:enqueue-node
		entry := queue[0]  // @step:dequeue-node
		queue = queue[1:]
		node := entry.node         // @step:dequeue-node
		diagonal := entry.diagonal // @step:dequeue-node

		diagonalMap[diagonal] = append(diagonalMap[diagonal], node.value) // @step:visit

		if diagonal > maxDiagonal {
			maxDiagonal = diagonal // @step:visit
		}

		// Right child stays on same diagonal
		if node.right != nil {
			// @step:traverse-right
			queue = append(queue, queueEntry{node: node.right, diagonal: diagonal}) // @step:traverse-right
		}
		// Left child moves to next diagonal
		if node.left != nil {
			// @step:traverse-left
			queue = append(queue, queueEntry{node: node.left, diagonal: diagonal + 1}) // @step:traverse-left
		}
	}

	// Collect diagonals in order
	for diag := 0; diag <= maxDiagonal; diag++ {
		// @step:visit
		if values, ok := diagonalMap[diag]; ok {
			result = append(result, values) // @step:visit
		}
	}

	return result // @step:complete
}
