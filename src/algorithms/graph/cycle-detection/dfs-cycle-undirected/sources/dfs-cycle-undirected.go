// DFS Cycle Detection (Undirected) — parent tracking to identify back edges
package dfscycleundirected

func dfsCycleUndirected(adjacencyList map[string][]string, nodeIds []string) bool {
	visitedSet := make(map[string]bool) // @step:initialize

	var dfsVisit func(currentNodeId string, parentNodeId string) bool
	dfsVisit = func(currentNodeId string, parentNodeId string) bool {
		visitedSet[currentNodeId] = true // @step:push-stack

		neighbors := adjacencyList[currentNodeId] // @step:visit
		for _, neighborId := range neighbors {
			if !visitedSet[neighborId] {
				// @step:classify-edge
				if dfsVisit(neighborId, currentNodeId) {
					// @step:classify-edge
					return true // @step:classify-edge
				}
			} else if neighborId != parentNodeId {
				// @step:classify-edge
				return true // @step:classify-edge
			}
		}

		return false // @step:pop-stack
	}

	for _, nodeId := range nodeIds {
		if !visitedSet[nodeId] {
			// @step:visit
			if dfsVisit(nodeId, "") {
				// @step:visit
				return true // @step:complete
			}
		}
	}

	return false // @step:complete
}
