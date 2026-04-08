// Hierholzer's Algorithm — find an Eulerian circuit using subcircuit splicing
package hierholzers

func hierholzersAlgorithm(adjacencyList map[string][]string, startNodeId string) []string {
	// Build a mutable copy of the adjacency list so edges can be removed as used
	remainingEdges := make(map[string][]string) // @step:initialize
	for nodeId, neighbors := range adjacencyList {
		neighborsCopy := make([]string, len(neighbors))
		copy(neighborsCopy, neighbors)
		remainingEdges[nodeId] = neighborsCopy // @step:initialize
	}

	circuit := make([]string, 0)           // @step:initialize
	nodeStack := []string{startNodeId}     // @step:initialize,push-stack

	for len(nodeStack) > 0 {
		currentNodeId := nodeStack[len(nodeStack)-1] // @step:pop-stack
		currentNeighbors := remainingEdges[currentNodeId]

		if len(currentNeighbors) > 0 {
			nextNodeId := currentNeighbors[0]                       // @step:use-edge
			remainingEdges[currentNodeId] = currentNeighbors[1:]   // @step:use-edge
			// For undirected graphs, remove the reverse edge as well
			reverseNeighbors := remainingEdges[nextNodeId]
			reverseIndex := -1
			for reverseIdx, reverseNeighborId := range reverseNeighbors {
				if reverseNeighborId == currentNodeId {
					reverseIndex = reverseIdx
					break
				}
			}
			if reverseIndex != -1 {
				remainingEdges[nextNodeId] = append(
					reverseNeighbors[:reverseIndex],
					reverseNeighbors[reverseIndex+1:]...,
				) // @step:use-edge
			}
			nodeStack = append(nodeStack, nextNodeId) // @step:push-stack
		} else {
			// No unused edges from currentNodeId — add it to the circuit
			nodeStack = nodeStack[:len(nodeStack)-1]  // @step:pop-stack
			circuit = append([]string{currentNodeId}, circuit...) // @step:visit
		}
	}

	return circuit // @step:complete
}
