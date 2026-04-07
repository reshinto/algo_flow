// A* search — finds shortest path using f = g + h (cost-so-far + heuristic estimate)
package astar

import (
	"math"
	"sort"
)

type AdjEntry struct {
	NodeId string
	Weight int
}

type PQEntry struct {
	FCost  int
	NodeId string
}

func aStarSearch(
	adjacencyList map[string][]AdjEntry,
	startNodeId string,
	targetNodeId string,
	heuristic map[string]int,
) []string {
	gCosts := make(map[string]int)        // @step:initialize
	predecessors := make(map[string]string) // @step:initialize
	visited := make(map[string]bool)       // @step:initialize

	for nodeId := range adjacencyList {
		gCosts[nodeId] = math.MaxInt32   // @step:initialize
		predecessors[nodeId] = ""         // @step:initialize
	}
	gCosts[startNodeId] = 0 // @step:initialize

	// Open set as priority queue: {fCost, nodeId}
	hStart := heuristic[startNodeId]
	openQueue := []PQEntry{{FCost: hStart, NodeId: startNodeId}} // @step:initialize

	for len(openQueue) > 0 {
		sort.Slice(openQueue, func(pairA, pairB int) bool {
			return openQueue[pairA].FCost < openQueue[pairB].FCost
		})
		currentEntry := openQueue[0]         // @step:dequeue
		openQueue = openQueue[1:]            // @step:dequeue
		currentNodeId := currentEntry.NodeId // @step:dequeue

		if visited[currentNodeId] {
			continue // @step:dequeue
		}
		visited[currentNodeId] = true // @step:visit

		if currentNodeId == targetNodeId {
			// Reconstruct path
			path := make([]string, 0)
			traceId := currentNodeId
			for traceId != "" {
				path = append([]string{traceId}, path...)
				traceId = predecessors[traceId]
			}
			return path // @step:complete
		}

		neighbors := adjacencyList[currentNodeId]
		for _, neighborEntry := range neighbors {
			neighborId := neighborEntry.NodeId
			edgeWeight := neighborEntry.Weight
			if visited[neighborId] {
				continue
			}
			currentG := gCosts[currentNodeId]
			tentativeGCost := currentG + edgeWeight // @step:relax-edge
			neighborG := gCosts[neighborId]
			if neighborG == 0 {
				neighborG = math.MaxInt32
			}
			if tentativeGCost < neighborG {
				gCosts[neighborId] = tentativeGCost           // @step:update-distance
				predecessors[neighborId] = currentNodeId       // @step:update-distance
				fCost := tentativeGCost + heuristic[neighborId]
				openQueue = append(openQueue, PQEntry{FCost: fCost, NodeId: neighborId}) // @step:update-distance
			}
		}
	}

	return nil // @step:complete
}
