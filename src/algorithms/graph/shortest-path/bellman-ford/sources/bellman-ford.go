// Bellman-Ford — finds shortest paths tolerating negative edge weights; detects negative cycles
package bellmanford

import "math"

type AdjEntry struct {
	NodeId string
	Weight int
}

func bellmanFord(
	adjacencyList map[string][]AdjEntry,
	startNodeId string,
	nodeIds []string,
) map[string]int {
	distances := make(map[string]int) // @step:initialize

	for _, nodeId := range nodeIds {
		distances[nodeId] = math.MaxInt32 // @step:initialize
	}
	distances[startNodeId] = 0 // @step:initialize

	vertexCount := len(nodeIds)

	// Relax all edges (V - 1) times
	for passIndex := 0; passIndex < vertexCount-1; passIndex++ {
		for _, sourceId := range nodeIds {
			neighbors := adjacencyList[sourceId]
			for _, neighborEntry := range neighbors {
				targetId := neighborEntry.NodeId
				edgeWeight := neighborEntry.Weight
				sourceDist := distances[sourceId]
				if sourceDist == math.MaxInt32 {
					continue // @step:visit-edge
				}
				tentativeDistance := sourceDist + edgeWeight // @step:relax-edge
				targetDist := distances[targetId]
				if targetDist == 0 {
					targetDist = math.MaxInt32
				}
				if tentativeDistance < targetDist {
					distances[targetId] = tentativeDistance // @step:update-distance
				}
			}
		}
	}

	// Detect negative cycles — one more pass; any improvement means a negative cycle
	for _, sourceId := range nodeIds {
		neighbors := adjacencyList[sourceId]
		for _, neighborEntry := range neighbors {
			targetId := neighborEntry.NodeId
			edgeWeight := neighborEntry.Weight
			sourceDist := distances[sourceId]
			if sourceDist == math.MaxInt32 {
				continue
			}
			targetDist := distances[targetId]
			if sourceDist+edgeWeight < targetDist {
				distances[targetId] = math.MinInt32 // @step:update-distance
			}
		}
	}

	return distances // @step:complete
}
