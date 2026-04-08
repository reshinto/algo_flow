// DAG Shortest Path — finds shortest paths from a source in a directed acyclic graph
// using topological sort followed by edge relaxation in topological order
package dagshortestpath

import "math"

type AdjEntry struct {
	NodeId string
	Weight int
}

func dagShortestPath(
	adjacencyList map[string][]AdjEntry,
	startNodeId string,
	nodeIds []string,
) map[string]int {
	distances := make(map[string]int) // @step:initialize
	for _, nodeId := range nodeIds {
		distances[nodeId] = math.MaxInt32 // @step:initialize
	}
	distances[startNodeId] = 0 // @step:initialize

	// Topological sort via DFS
	visited := make(map[string]bool) // @step:initialize
	topologicalOrder := make([]string, 0) // @step:initialize

	var dfsVisit func(nodeId string)
	dfsVisit = func(nodeId string) {
		visited[nodeId] = true
		neighbors := adjacencyList[nodeId]
		for _, neighborEntry := range neighbors {
			if !visited[neighborEntry.NodeId] {
				dfsVisit(neighborEntry.NodeId)
			}
		}
		topologicalOrder = append([]string{nodeId}, topologicalOrder...) // @step:add-to-order
	}

	for _, nodeId := range nodeIds {
		if !visited[nodeId] {
			dfsVisit(nodeId)
		}
	}

	// Relax edges in topological order
	for _, nodeId := range topologicalOrder {
		nodeDist := distances[nodeId]
		if nodeDist == math.MaxInt32 {
			continue // @step:process-node
		}
		neighbors := adjacencyList[nodeId]
		for _, neighborEntry := range neighbors {
			neighborId := neighborEntry.NodeId
			edgeWeight := neighborEntry.Weight
			tentativeDistance := nodeDist + edgeWeight // @step:relax-edge
			neighborDist := distances[neighborId]
			if neighborDist == 0 {
				neighborDist = math.MaxInt32
			}
			if tentativeDistance < neighborDist {
				distances[neighborId] = tentativeDistance // @step:update-distance
			}
		}
	}

	return distances // @step:complete
}
