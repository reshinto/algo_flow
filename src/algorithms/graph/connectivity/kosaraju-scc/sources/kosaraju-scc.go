// Kosaraju's SCC — two-pass DFS: first pass collects finish order, second pass on transposed graph
package kosarajuscc

func kosarajuSCC(adjacencyList map[string][]string, nodeIds []string) [][]string {
	visitedSet := make(map[string]bool) // @step:initialize
	finishOrder := make([]string, 0)    // @step:initialize

	// First pass: DFS on original graph to collect finish order
	var dfsFirstPass func(nodeId string)
	dfsFirstPass = func(nodeId string) {
		visitedSet[nodeId] = true // @step:visit
		neighbors := adjacencyList[nodeId]
		for _, neighborId := range neighbors {
			if !visitedSet[neighborId] {
				dfsFirstPass(neighborId) // @step:visit-edge
			}
		}
		finishOrder = append(finishOrder, nodeId) // @step:push-stack
	}

	for _, nodeId := range nodeIds {
		if !visitedSet[nodeId] {
			dfsFirstPass(nodeId) // @step:initialize
		}
	}

	// Build transposed adjacency list
	transposedList := make(map[string][]string) // @step:initialize
	for _, nodeId := range nodeIds {
		transposedList[nodeId] = []string{}
	}
	for _, sourceId := range nodeIds {
		neighbors := adjacencyList[sourceId]
		for _, targetId := range neighbors {
			transposedList[targetId] = append(transposedList[targetId], sourceId) // @step:initialize
		}
	}

	// Second pass: DFS on transposed graph in reverse finish order
	for key := range visitedSet {
		delete(visitedSet, key)
	} // @step:initialize
	components := make([][]string, 0) // @step:initialize

	var dfsSecondPass func(nodeId string, currentComponent *[]string)
	dfsSecondPass = func(nodeId string, currentComponent *[]string) {
		visitedSet[nodeId] = true                           // @step:visit
		*currentComponent = append(*currentComponent, nodeId) // @step:visit
		neighbors := transposedList[nodeId]
		for _, neighborId := range neighbors {
			if !visitedSet[neighborId] {
				dfsSecondPass(neighborId, currentComponent) // @step:visit-edge
			}
		}
	}

	for index := len(finishOrder) - 1; index >= 0; index-- {
		nodeId := finishOrder[index]
		if !visitedSet[nodeId] {
			currentComponent := make([]string, 0)          // @step:pop-stack
			dfsSecondPass(nodeId, &currentComponent)        // @step:pop-stack
			components = append(components, currentComponent) // @step:assign-component
		}
	}

	return components // @step:complete
}
