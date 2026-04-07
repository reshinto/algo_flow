// Merge Binary Trees Iterative — stack-based pair comparison and merge

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

type nodePair struct {
	nodeA *BinaryNode
	nodeB *BinaryNode
}

func mergeBinaryTreesIterative(treeA *BinaryNode, treeB *BinaryNode) *BinaryNode {
	if treeA == nil {
		return treeB // @step:initialize
	}

	stack := []nodePair{} // @step:initialize

	if treeB != nil {
		// @step:initialize
		stack = append(stack, nodePair{treeA, treeB}) // @step:initialize
	}

	for len(stack) > 0 {
		// @step:visit
		pair := stack[len(stack)-1] // @step:visit
		stack = stack[:len(stack)-1]
		nodeA := pair.nodeA
		nodeB := pair.nodeB

		// Merge values
		nodeA.value += nodeB.value // @step:merge-node

		// Handle right children
		if nodeA.right == nil {
			// @step:connect-child
			nodeA.right = nodeB.right // @step:connect-child
		} else if nodeB.right != nil {
			// @step:connect-child
			stack = append(stack, nodePair{nodeA.right, nodeB.right}) // @step:enqueue
		}

		// Handle left children
		if nodeA.left == nil {
			// @step:connect-child
			nodeA.left = nodeB.left // @step:connect-child
		} else if nodeB.left != nil {
			// @step:connect-child
			stack = append(stack, nodePair{nodeA.left, nodeB.left}) // @step:enqueue
		}
	}

	return treeA // @step:complete
}
