// Lowest Common Ancestor Iterative — BFS to build parent map, then trace ancestors

package main

type BinaryNode struct {
	value int
	left  *BinaryNode
	right *BinaryNode
}

func lowestCommonAncestorIterative(root *BinaryNode, nodeValueA int, nodeValueB int) *BinaryNode {
	if root == nil {
		return nil // @step:initialize
	}

	// Build parent map using BFS
	parentMap := map[*BinaryNode]*BinaryNode{} // @step:initialize
	parentMap[root] = nil                      // @step:initialize
	bfsQueue := []*BinaryNode{root}            // @step:initialize

	// BFS until we find both target nodes
	var nodeA *BinaryNode
	var nodeB *BinaryNode

	for len(bfsQueue) > 0 && (nodeA == nil || nodeB == nil) {
		// @step:visit
		current := bfsQueue[0] // @step:dequeue
		bfsQueue = bfsQueue[1:]

		if current.value == nodeValueA {
			nodeA = current // @step:compare
		}
		if current.value == nodeValueB {
			nodeB = current // @step:compare
		}

		if current.left != nil {
			// @step:enqueue
			parentMap[current.left] = current              // @step:enqueue
			bfsQueue = append(bfsQueue, current.left) // @step:enqueue
		}
		if current.right != nil {
			// @step:enqueue
			parentMap[current.right] = current              // @step:enqueue
			bfsQueue = append(bfsQueue, current.right) // @step:enqueue
		}
	}

	if nodeA == nil || nodeB == nil {
		return nil
	}

	// Trace ancestors of nodeA into a set
	ancestorsA := map[*BinaryNode]bool{} // @step:visit
	traceNode := nodeA
	for traceNode != nil {
		// @step:visit
		ancestorsA[traceNode] = true  // @step:visit
		traceNode = parentMap[traceNode] // @step:visit
	}

	// Walk ancestors of nodeB until we hit the first ancestor also in ancestorsA
	traceNode = nodeB
	for traceNode != nil {
		// @step:visit
		if ancestorsA[traceNode] {
			return traceNode // @step:compare
		}
		traceNode = parentMap[traceNode] // @step:visit
	}

	return nil // @step:complete
}
