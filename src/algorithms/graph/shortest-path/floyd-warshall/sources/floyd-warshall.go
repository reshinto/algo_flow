// Floyd-Warshall — computes all-pairs shortest paths via dynamic programming
package floydwarshall

import "math"

type AdjEntry struct {
	NodeId string
	Weight int
}

func floydWarshall(
	adjacencyList map[string][]AdjEntry,
	nodeIds []string,
) map[string]map[string]int {
	// Initialize distance matrix
	distances := make(map[string]map[string]int) // @step:initialize

	for _, sourceId := range nodeIds {
		distances[sourceId] = make(map[string]int)
		for _, targetId := range nodeIds {
			if sourceId == targetId {
				distances[sourceId][targetId] = 0 // @step:initialize
			} else {
				distances[sourceId][targetId] = math.MaxInt32 // @step:initialize
			}
		}
	}

	// Set direct edge weights
	for _, sourceId := range nodeIds {
		neighbors := adjacencyList[sourceId]
		for _, neighborEntry := range neighbors {
			distances[sourceId][neighborEntry.NodeId] = neighborEntry.Weight // @step:initialize
		}
	}

	// Triple nested loop: try every intermediate node
	for _, intermediateId := range nodeIds {
		for _, sourceId := range nodeIds {
			for _, targetId := range nodeIds {
				throughSource := distances[sourceId][intermediateId]
				throughTarget := distances[intermediateId][targetId]
				var throughIntermediate int
				if throughSource == math.MaxInt32 || throughTarget == math.MaxInt32 {
					throughIntermediate = math.MaxInt32
				} else {
					throughIntermediate = throughSource + throughTarget
				} // @step:relax-edge
				if throughIntermediate < distances[sourceId][targetId] {
					distances[sourceId][targetId] = throughIntermediate // @step:update-distance
				}
			}
		}
	}

	return distances // @step:complete
}
