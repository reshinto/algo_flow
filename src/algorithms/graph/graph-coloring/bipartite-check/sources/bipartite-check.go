// Bipartite Check — 2-coloring via BFS; conflict means not bipartite
package bipartitecheck

type BipartiteResult struct {
	IsBipartite bool
	Coloring    map[string]int
}

func bipartiteCheck(adjacencyList map[string][]string, nodeIds []string) BipartiteResult {
	coloring := make(map[string]int) // @step:initialize

	for _, startNodeId := range nodeIds {
		if _, exists := coloring[startNodeId]; exists {
			continue // @step:initialize
		}

		coloring[startNodeId] = 0                 // @step:enqueue
		nodeQueue := []string{startNodeId}        // @step:enqueue

		for len(nodeQueue) > 0 {
			currentId := nodeQueue[0]              // @step:dequeue
			nodeQueue = nodeQueue[1:]              // @step:dequeue
			currentColor := coloring[currentId]   // @step:visit-node
			neighbors := adjacencyList[currentId] // @step:visit-node

			for _, neighborId := range neighbors {
				if _, exists := coloring[neighborId]; !exists {
					coloring[neighborId] = 1 - currentColor           // @step:assign-color
					nodeQueue = append(nodeQueue, neighborId)         // @step:assign-color
				} else if coloring[neighborId] == currentColor {
					return BipartiteResult{IsBipartite: false, Coloring: coloring} // @step:check-conflict
				}
			}
		}
	}

	return BipartiteResult{IsBipartite: true, Coloring: coloring} // @step:complete
}
