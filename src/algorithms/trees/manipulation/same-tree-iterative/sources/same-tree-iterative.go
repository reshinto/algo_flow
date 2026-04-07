// Same Tree Iterative — queue-based: compare pairs of nodes from both trees simultaneously

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

type treeNodePair struct {
	nodeA *BinaryNode
	nodeB *BinaryNode
}

func sameTreeIterative(treeA *BinaryNode, treeB *BinaryNode) bool {
	queue := []treeNodePair{{treeA, treeB}} // @step:initialize

	for len(queue) > 0 {
		// @step:visit
		pair := queue[0]  // @step:dequeue
		queue = queue[1:]
		nodeA := pair.nodeA
		nodeB := pair.nodeB

		if nodeA == nil && nodeB == nil {
			continue // @step:compare
		}
		if nodeA == nil || nodeB == nil {
			return false // @step:compare
		}
		if nodeA.value != nodeB.value {
			return false // @step:compare
		}

		queue = append(queue, treeNodePair{nodeA.left, nodeB.left})   // @step:enqueue
		queue = append(queue, treeNodePair{nodeA.right, nodeB.right}) // @step:enqueue
	}

	return true // @step:complete
}
