// Prim's Algorithm — grow MST from start node by always selecting the cheapest outgoing edge
package prims

import "sort"

type AdjEntry struct {
	NodeId string
	Weight int
}

type MstEdge struct {
	Source string
	Target string
	Weight int
}

type PQEntry struct {
	Weight   int
	SourceId string
	TargetId string
}

func primsAlgorithm(adjacencyList map[string][]AdjEntry, startNodeId string) []MstEdge {
	mstEdges := make([]MstEdge, 0)  // @step:initialize
	inMstSet := make(map[string]bool) // @step:initialize
	inMstSet[startNodeId] = true     // @step:initialize

	priorityQueue := make([]PQEntry, 0) // @step:initialize

	for _, entry := range adjacencyList[startNodeId] {
		priorityQueue = append(priorityQueue, PQEntry{
			Weight:   entry.Weight,
			SourceId: startNodeId,
			TargetId: entry.NodeId,
		}) // @step:initialize
	}
	sort.Slice(priorityQueue, func(entryA, entryB int) bool {
		return priorityQueue[entryA].Weight < priorityQueue[entryB].Weight
	}) // @step:initialize

	for len(priorityQueue) > 0 {
		entry := priorityQueue[0]       // @step:dequeue
		priorityQueue = priorityQueue[1:] // @step:dequeue
		edgeWeight := entry.Weight
		sourceId := entry.SourceId
		targetId := entry.TargetId

		if inMstSet[targetId] {
			continue // @step:dequeue
		}

		inMstSet[targetId] = true // @step:visit
		mstEdges = append(mstEdges, MstEdge{
			Source: sourceId,
			Target: targetId,
			Weight: edgeWeight,
		}) // @step:add-to-mst

		for _, neighborEntry := range adjacencyList[targetId] {
			if !inMstSet[neighborEntry.NodeId] {
				priorityQueue = append(priorityQueue, PQEntry{
					Weight:   neighborEntry.Weight,
					SourceId: targetId,
					TargetId: neighborEntry.NodeId,
				}) // @step:relax-edge
				sort.Slice(priorityQueue, func(entryA, entryB int) bool {
					return priorityQueue[entryA].Weight < priorityQueue[entryB].Weight
				}) // @step:relax-edge
			}
		}
	}

	return mstEdges // @step:complete
}
