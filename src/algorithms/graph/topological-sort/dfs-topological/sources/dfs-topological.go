// DFS Topological Sort — post-order DFS, prepend finished nodes to result
package dfstopological

func dfsTopologicalSort(adjacencyList map[string][]string, nodeIds []string) []string {
	visitedSet := make(map[string]bool) // @step:initialize
	topologicalOrder := make([]string, 0) // @step:initialize

	var dfsVisit func(currentNodeId string)
	dfsVisit = func(currentNodeId string) {
		visitedSet[currentNodeId] = true // @step:visit
		neighbors := adjacencyList[currentNodeId] // @step:visit
		for _, neighborId := range neighbors {
			if !visitedSet[neighborId] {
				// @step:push-stack
				dfsVisit(neighborId) // @step:push-stack
			}
		}
		topologicalOrder = append([]string{currentNodeId}, topologicalOrder...) // @step:add-to-order
	}

	for _, nodeId := range nodeIds {
		if !visitedSet[nodeId] {
			// @step:push-stack
			dfsVisit(nodeId) // @step:push-stack
		}
	}

	return topologicalOrder // @step:complete
}
