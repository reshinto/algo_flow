// Tarjan's SCC — finds strongly connected components using DFS with discovery and low-link values
package tarjanscc

func tarjanSCC(adjacencyList map[string][]string, nodeIds []string) [][]string {
	discoveryTime := make(map[string]int)  // @step:initialize
	lowLink := make(map[string]int)         // @step:initialize
	onStack := make(map[string]bool)        // @step:initialize
	nodeStack := make([]string, 0)          // @step:initialize
	components := make([][]string, 0)       // @step:initialize
	timer := 0                              // @step:initialize

	for key := range adjacencyList {
		discoveryTime[key] = -1
	}

	var dfs func(nodeId string)
	dfs = func(nodeId string) {
		discoveryTime[nodeId] = timer // @step:visit
		lowLink[nodeId] = timer       // @step:visit
		timer++                       // @step:visit
		nodeStack = append(nodeStack, nodeId) // @step:push-stack
		onStack[nodeId] = true                // @step:push-stack

		neighbors := adjacencyList[nodeId]
		for _, neighborId := range neighbors {
			if discoveryTime[neighborId] == -1 {
				dfs(neighborId) // @step:visit-edge
				if lowLink[neighborId] < lowLink[nodeId] {
					lowLink[nodeId] = lowLink[neighborId]
				} // @step:visit-edge
			} else if onStack[neighborId] {
				if discoveryTime[neighborId] < lowLink[nodeId] {
					lowLink[nodeId] = discoveryTime[neighborId]
				} // @step:visit-edge
			}
		}

		if lowLink[nodeId] == discoveryTime[nodeId] {
			component := make([]string, 0) // @step:pop-stack
			for {
				poppedNodeId := nodeStack[len(nodeStack)-1] // @step:pop-stack
				nodeStack = nodeStack[:len(nodeStack)-1]     // @step:pop-stack
				onStack[poppedNodeId] = false                // @step:pop-stack
				component = append(component, poppedNodeId)  // @step:pop-stack
				if poppedNodeId == nodeId {
					break
				}
			}
			components = append(components, component) // @step:assign-component
		}
	}

	for _, nodeId := range nodeIds {
		if discoveryTime[nodeId] == -1 {
			dfs(nodeId) // @step:initialize
		}
	}

	return components // @step:complete
}
