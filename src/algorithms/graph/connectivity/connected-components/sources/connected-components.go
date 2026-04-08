// Connected Components — find all connected components in an undirected graph using BFS
package connectedcomponents

func connectedComponents(adjacencyList map[string][]string, nodeIds []string) [][]string {
	components := make([][]string, 0) // @step:initialize
	visitedSet := make(map[string]bool) // @step:initialize

	for _, startNodeId := range nodeIds {
		if visitedSet[startNodeId] {
			continue // @step:initialize
		}

		currentComponent := make([]string, 0) // @step:enqueue
		nodeQueue := []string{startNodeId}      // @step:enqueue
		visitedSet[startNodeId] = true          // @step:enqueue

		for len(nodeQueue) > 0 {
			currentNodeId := nodeQueue[0] // @step:dequeue
			nodeQueue = nodeQueue[1:]     // @step:dequeue
			currentComponent = append(currentComponent, currentNodeId) // @step:dequeue,visit

			neighbors := adjacencyList[currentNodeId]
			for _, neighborId := range neighbors {
				if !visitedSet[neighborId] {
					visitedSet[neighborId] = true              // @step:visit-edge
					nodeQueue = append(nodeQueue, neighborId) // @step:visit-edge,enqueue
				}
			}
		}

		components = append(components, currentComponent) // @step:assign-component
	}

	return components // @step:complete
}
