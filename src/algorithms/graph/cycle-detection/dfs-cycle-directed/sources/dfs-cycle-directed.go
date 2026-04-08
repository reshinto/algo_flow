// DFS Cycle Detection (Directed) — three-color marking via DFS
// White = unvisited, Gray = in current stack, Black = fully processed
package dfscycledirected

func dfsCycleDirected(adjacencyList map[string][]string, nodeIds []string) bool {
	colorMap := make(map[string]string) // @step:initialize
	for _, nodeId := range nodeIds {
		// @step:initialize
		colorMap[nodeId] = "white" // @step:initialize
	}

	var dfsVisit func(currentNodeId string) bool
	dfsVisit = func(currentNodeId string) bool {
		colorMap[currentNodeId] = "gray" // @step:push-stack

		neighbors := adjacencyList[currentNodeId] // @step:visit
		for _, neighborId := range neighbors {
			if colorMap[neighborId] == "gray" {
				// @step:classify-edge
				return true // @step:classify-edge
			}
			if colorMap[neighborId] == "white" {
				// @step:classify-edge
				if dfsVisit(neighborId) {
					// @step:classify-edge
					return true // @step:classify-edge
				}
			}
		}

		colorMap[currentNodeId] = "black" // @step:process-node
		return false                       // @step:process-node
	}

	for _, nodeId := range nodeIds {
		if colorMap[nodeId] == "white" {
			// @step:visit
			if dfsVisit(nodeId) {
				// @step:visit
				return true // @step:complete
			}
		}
	}

	return false // @step:complete
}
