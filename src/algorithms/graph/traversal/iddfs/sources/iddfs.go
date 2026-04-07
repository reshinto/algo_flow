// IDDFS — iterative deepening depth-first search using increasing depth limits
package iddfs

type StackFrame struct {
	NodeId string
	Depth  int
}

func iterativeDeepeningDFS(
	adjacencyList map[string][]string,
	startNodeId string,
	maxDepth int,
) []string {
	visitOrder := make([]string, 0) // @step:initialize
	resolvedMaxDepth := maxDepth     // @step:initialize
	if resolvedMaxDepth < 0 {
		resolvedMaxDepth = len(adjacencyList)
	}

	for depthLimit := 0; depthLimit <= resolvedMaxDepth; depthLimit++ {
		// @step:initialize
		visitOrder = visitOrder[:0]             // @step:initialize
		visitedSet := make(map[string]bool)    // @step:initialize

		nodeStack := []StackFrame{{NodeId: startNodeId, Depth: 0}} // @step:push-stack

		for len(nodeStack) > 0 {
			frame := nodeStack[len(nodeStack)-1]  // @step:pop-stack
			nodeStack = nodeStack[:len(nodeStack)-1] // @step:pop-stack
			currentNodeId := frame.NodeId         // @step:pop-stack
			currentDepth := frame.Depth           // @step:pop-stack

			if visitedSet[currentNodeId] {
				// @step:backtrack
				continue // @step:backtrack
			}

			visitedSet[currentNodeId] = true                       // @step:visit
			visitOrder = append(visitOrder, currentNodeId)         // @step:visit

			if currentDepth >= depthLimit {
				// @step:visit
				continue // @step:visit
			}

			neighbors := adjacencyList[currentNodeId] // @step:visit-edge
			for neighborIndex := len(neighbors) - 1; neighborIndex >= 0; neighborIndex-- {
				// @step:visit-edge
				neighborId := neighbors[neighborIndex] // @step:visit-edge
				if !visitedSet[neighborId] {
					// @step:visit-edge
					nodeStack = append(nodeStack, StackFrame{
						NodeId: neighborId,
						Depth:  currentDepth + 1,
					}) // @step:push-stack
				}
			}
		}

		allVisited := true
		for nodeId := range adjacencyList {
			if !visitedSet[nodeId] {
				allVisited = false
				break
			}
		} // @step:complete
		if allVisited {
			break // @step:complete
		}
	}

	return visitOrder // @step:complete
}
