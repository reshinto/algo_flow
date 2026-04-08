// Kahn's Algorithm — topological sort using BFS and in-degree tracking
package kahns

func kahnsTopologicalSort(adjacencyList map[string][]string, nodeIds []string) []string {
	inDegreeMap := make(map[string]int) // @step:initialize
	for _, nodeId := range nodeIds {
		inDegreeMap[nodeId] = 0
	} // @step:initialize
	for _, nodeId := range nodeIds {
		neighbors := adjacencyList[nodeId] // @step:initialize
		for _, neighborId := range neighbors {
			inDegreeMap[neighborId]++
		} // @step:initialize
	}

	nodeQueue := make([]string, 0) // @step:initialize
	for _, nodeId := range nodeIds {
		if inDegreeMap[nodeId] == 0 {
			nodeQueue = append(nodeQueue, nodeId)
		} // @step:enqueue
	}

	topologicalOrder := make([]string, 0)

	for len(nodeQueue) > 0 {
		currentNodeId := nodeQueue[0]         // @step:dequeue
		nodeQueue = nodeQueue[1:]             // @step:dequeue
		topologicalOrder = append(topologicalOrder, currentNodeId) // @step:add-to-order

		neighbors := adjacencyList[currentNodeId]
		for _, neighborId := range neighbors {
			inDegreeMap[neighborId]-- // @step:visit
			if inDegreeMap[neighborId] == 0 {
				nodeQueue = append(nodeQueue, neighborId)
			} // @step:enqueue
		}
	}

	return topologicalOrder // @step:complete
}
