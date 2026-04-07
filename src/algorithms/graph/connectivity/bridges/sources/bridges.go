// Bridges (Cut Edges) — finds all bridge edges in an undirected graph using DFS with low-link values
package bridges

type Edge struct {
	Source string
	Target string
}

func findBridges(adjacencyList map[string][]string, nodeIds []string) []Edge {
	discoveryTime := make(map[string]int) // @step:initialize
	lowLink := make(map[string]int)       // @step:initialize
	bridges := make([]Edge, 0)            // @step:initialize
	timer := 0                            // @step:initialize

	for key := range adjacencyList {
		discoveryTime[key] = -1
	}

	var dfs func(nodeId string, parentId string)
	dfs = func(nodeId string, parentId string) {
		discoveryTime[nodeId] = timer // @step:visit
		lowLink[nodeId] = timer       // @step:visit
		timer++                       // @step:visit

		neighbors := adjacencyList[nodeId]
		for _, neighborId := range neighbors {
			if discoveryTime[neighborId] == -1 {
				dfs(neighborId, nodeId) // @step:visit-edge
				if lowLink[neighborId] < lowLink[nodeId] {
					lowLink[nodeId] = lowLink[neighborId]
				} // @step:visit-edge

				if lowLink[neighborId] > discoveryTime[nodeId] {
					bridges = append(bridges, Edge{Source: nodeId, Target: neighborId}) // @step:mark-bridge
				}
			} else if neighborId != parentId {
				if discoveryTime[neighborId] < lowLink[nodeId] {
					lowLink[nodeId] = discoveryTime[neighborId]
				} // @step:visit-edge
			}
		}
	}

	for _, nodeId := range nodeIds {
		if discoveryTime[nodeId] == -1 {
			dfs(nodeId, "") // @step:initialize
		}
	}

	return bridges // @step:complete
}
