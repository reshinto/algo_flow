// Ford-Fulkerson — max flow via DFS augmenting paths in a residual graph
package fordfulkerson

import "math"

type FlowEdge struct {
	Target   string
	Capacity int
}

func fordFulkerson(
	adjacencyList map[string][]FlowEdge,
	sourceNodeId string,
	sinkNodeId string,
) int {
	if sourceNodeId == sinkNodeId {
		return 0 // @step:initialize
	}

	residualCapacity := make(map[string]map[string]int) // @step:initialize
	for nodeId := range adjacencyList {
		residualCapacity[nodeId] = make(map[string]int) // @step:initialize
	}
	for nodeId, edges := range adjacencyList {
		for _, flowEdge := range edges {
			if residualCapacity[flowEdge.Target] == nil {
				residualCapacity[flowEdge.Target] = make(map[string]int)
			}
			prev := residualCapacity[nodeId][flowEdge.Target]
			residualCapacity[nodeId][flowEdge.Target] = prev + flowEdge.Capacity // @step:initialize
		}
	}

	maxFlow := 0 // @step:initialize

	var dfsAugment func(currentId string, visitedSet map[string]bool, bottleneck int) int
	dfsAugment = func(currentId string, visitedSet map[string]bool, bottleneck int) int {
		if currentId == sinkNodeId {
			return bottleneck // @step:dfs-augment
		}
		visitedSet[currentId] = true // @step:dfs-augment
		for neighborId, residual := range residualCapacity[currentId] { // @step:visit-edge
			residualVal := residual // @step:visit-edge
			if !visitedSet[neighborId] && residualVal > 0 {
				minBottleneck := bottleneck
				if residualVal < minBottleneck {
					minBottleneck = residualVal
				}
				flow := dfsAugment(neighborId, visitedSet, minBottleneck) // @step:augment-flow
				if flow > 0 {
					residualCapacity[currentId][neighborId] = residualVal - flow // @step:augment-flow
					back := residualCapacity[neighborId][currentId]
					residualCapacity[neighborId][currentId] = back + flow // @step:augment-flow
					return flow                                           // @step:augment-flow
				}
			}
		}
		return 0 // @step:dfs-augment
	}

	for {
		visitedSet := make(map[string]bool)                              // @step:augment-flow
		pathFlow := dfsAugment(sourceNodeId, visitedSet, math.MaxInt32) // @step:augment-flow
		if pathFlow == 0 {
			break // @step:augment-flow
		}
		maxFlow += pathFlow // @step:augment-flow
	}

	return maxFlow // @step:complete
}
