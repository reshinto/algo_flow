// Right Side View — BFS: collect the last node of each level

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func rightSideView(root *BinaryNode) []int {
	if root == nil {
		return []int{} // @step:initialize
	}

	result := []int{}          // @step:initialize
	queue := []*BinaryNode{root} // @step:initialize

	for len(queue) > 0 {
		// @step:visit
		levelSize := len(queue) // @step:visit

		for position := 0; position < levelSize; position++ {
			// @step:visit
			node := queue[0]  // @step:dequeue
			queue = queue[1:]

			// The last node of this level is visible from the right side
			if position == levelSize-1 {
				// @step:collect-element
				result = append(result, node.value) // @step:collect-element
			}

			if node.left != nil {
				queue = append(queue, node.left) // @step:enqueue
			}
			if node.right != nil {
				queue = append(queue, node.right) // @step:enqueue
			}
		}
	}

	return result // @step:complete
}
