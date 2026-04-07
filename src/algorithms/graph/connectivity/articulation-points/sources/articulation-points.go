// Articulation Points — finds all cut vertices in an undirected graph using DFS with low-link values
package articulationpoints

import "math"

func findArticulationPoints(adjacencyList map[string][]string, nodeIds []string) []string {
	discoveryTime := make(map[string]int)   // @step:initialize
	lowLink := make(map[string]int)          // @step:initialize
	articulationPoints := make(map[string]bool) // @step:initialize
	timer := 0                               // @step:initialize

	for key := range adjacencyList {
		discoveryTime[key] = -1
	}

	var dfs func(nodeId string, parentId string)
	dfs = func(nodeId string, parentId string) {
		discoveryTime[nodeId] = timer // @step:visit
		lowLink[nodeId] = timer       // @step:visit
		timer++                       // @step:visit
		childCount := 0               // @step:visit

		neighbors := adjacencyList[nodeId]
		for _, neighborId := range neighbors {
			if discoveryTime[neighborId] == -1 {
				childCount++ // @step:visit-edge
				dfs(neighborId, nodeId) // @step:visit-edge
				if lowLink[neighborId] < lowLink[nodeId] {
					lowLink[nodeId] = lowLink[neighborId]
				} // @step:visit-edge

				// Root with multiple children is an articulation point
				if parentId == "" && childCount > 1 {
					articulationPoints[nodeId] = true // @step:mark-articulation
				}
				// Non-root: articulation point if no back edge from subtree
				if parentId != "" && lowLink[neighborId] >= discoveryTime[nodeId] {
					articulationPoints[nodeId] = true // @step:mark-articulation
				}
			} else if neighborId != parentId {
				neighborDisc := discoveryTime[neighborId]
				if neighborDisc == -1 {
					neighborDisc = math.MaxInt32
				}
				if neighborDisc < lowLink[nodeId] {
					lowLink[nodeId] = neighborDisc
				} // @step:visit-edge
			}
		}
	}

	for _, nodeId := range nodeIds {
		if discoveryTime[nodeId] == -1 {
			dfs(nodeId, "") // @step:initialize
		}
	}

	result := make([]string, 0, len(articulationPoints))
	for nodeId := range articulationPoints {
		result = append(result, nodeId)
	}
	return result // @step:complete
}
