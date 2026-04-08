// Is Symmetric Tree (Iterative) — queue-based: enqueue pairs and compare

package main

type TreeNode struct {
	value int
	left  *TreeNode
	right *TreeNode
}

type nodePair struct {
	left  *TreeNode
	right *TreeNode
}

func isSymmetricTreeIterative(root *TreeNode) bool {
	if root == nil {
		return true // @step:initialize
	}

	queue := []nodePair{} // @step:initialize
	queue = append(queue, nodePair{left: root.left, right: root.right}) // @step:initialize

	for len(queue) > 0 {
		// @step:visit
		pair := queue[0]      // @step:visit
		queue = queue[1:]     // @step:visit
		leftNode := pair.left // @step:visit
		rightNode := pair.right // @step:visit

		if leftNode == nil && rightNode == nil {
			continue // @step:check-balance
		}
		if leftNode == nil || rightNode == nil {
			return false // @step:check-balance
		}
		if leftNode.value != rightNode.value {
			return false // @step:check-balance
		}

		// Enqueue outer pair and inner pair
		queue = append(queue, nodePair{left: leftNode.left, right: rightNode.right})  // @step:traverse-left
		queue = append(queue, nodePair{left: leftNode.right, right: rightNode.left})  // @step:traverse-right
	}

	return true // @step:complete
}
