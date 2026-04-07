// Dijkstra's algorithm — finds shortest paths from a source using a min-priority queue
package dijkstra

import (
	"math"
	"sort"
)

type AdjEntry struct {
	NodeId string
	Weight int
}

type PQEntry struct {
	Distance int
	NodeId   string
}

func dijkstraShortestPath(
	adjacencyList map[string][]AdjEntry,
	startNodeId string,
) map[string]int {
	distances := make(map[string]int) // @step:initialize
	visited := make(map[string]bool) // @step:initialize

	// Initialize all distances to max
	for nodeId := range adjacencyList {
		distances[nodeId] = math.MaxInt32 // @step:initialize
	}
	distances[startNodeId] = 0 // @step:initialize

	// Min-priority queue: {distance, nodeId}
	priorityQueue := []PQEntry{{Distance: 0, NodeId: startNodeId}} // @step:initialize

	for len(priorityQueue) > 0 {
		sort.Slice(priorityQueue, func(pairA, pairB int) bool {
			return priorityQueue[pairA].Distance < priorityQueue[pairB].Distance
		})
		entry := priorityQueue[0]         // @step:dequeue
		priorityQueue = priorityQueue[1:] // @step:dequeue
		currentDist := entry.Distance
		currentNodeId := entry.NodeId

		if visited[currentNodeId] {
			continue // @step:dequeue
		}
		visited[currentNodeId] = true // @step:visit

		neighbors := adjacencyList[currentNodeId]
		for _, neighborEntry := range neighbors {
			neighborId := neighborEntry.NodeId
			edgeWeight := neighborEntry.Weight
			tentativeDistance := currentDist + edgeWeight // @step:relax-edge
			neighborDist := distances[neighborId]
			if neighborDist == 0 {
				neighborDist = math.MaxInt32
			}
			if tentativeDistance < neighborDist {
				distances[neighborId] = tentativeDistance // @step:update-distance
				priorityQueue = append(priorityQueue, PQEntry{
					Distance: tentativeDistance,
					NodeId:   neighborId,
				}) // @step:update-distance
			}
		}
	}

	return distances // @step:complete
}
