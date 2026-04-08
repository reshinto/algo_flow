// Borůvka's Algorithm — each component finds its cheapest outgoing edge each round
package boruvkas

import "math"

type WeightedEdge struct {
	Source string
	Target string
	Weight int
}

func boruvkasAlgorithm(edges []WeightedEdge, nodeIds []string) []WeightedEdge {
	mstEdges := make([]WeightedEdge, 0) // @step:initialize
	parent := make(map[string]string)    // @step:initialize
	rank := make(map[string]int)         // @step:initialize

	for _, nodeId := range nodeIds {
		// @step:initialize
		parent[nodeId] = nodeId // @step:initialize
		rank[nodeId] = 0        // @step:initialize
	}

	var findRoot func(nodeId string) string
	findRoot = func(nodeId string) string {
		// @step:initialize
		if parent[nodeId] != nodeId {
			// @step:initialize
			parent[nodeId] = findRoot(parent[nodeId]) // @step:initialize
		}
		return parent[nodeId] // @step:initialize
	}

	unionComponents := func(nodeA string, nodeB string) {
		// @step:initialize
		rootA := findRoot(nodeA) // @step:initialize
		rootB := findRoot(nodeB) // @step:initialize
		if rootA == rootB {
			return // @step:initialize
		}
		if rank[rootA] < rank[rootB] {
			// @step:initialize
			parent[rootA] = rootB // @step:initialize
		} else if rank[rootA] > rank[rootB] {
			// @step:initialize
			parent[rootB] = rootA // @step:initialize
		} else {
			// @step:initialize
			parent[rootB] = rootA // @step:initialize
			rank[rootA]++         // @step:initialize
		}
	}

	componentCount := len(nodeIds)

	for componentCount > 1 {
		cheapestEdgeIndex := make(map[string]int) // @step:visit-edge
		for key := range cheapestEdgeIndex {
			cheapestEdgeIndex[key] = -1
		}

		for edgeIdx, edge := range edges {
			sourceRoot := findRoot(edge.Source) // @step:visit-edge
			targetRoot := findRoot(edge.Target) // @step:visit-edge

			if sourceRoot == targetRoot {
				continue // @step:visit-edge
			}

			updateCheapest := func(root string) {
				// @step:visit-edge
				prevIdx, exists := cheapestEdgeIndex[root]
				if !exists || prevIdx == -1 || edge.Weight < edges[prevIdx].Weight {
					cheapestEdgeIndex[root] = edgeIdx // @step:visit-edge
				}
			}
			updateCheapest(sourceRoot)
			updateCheapest(targetRoot)
		}

		_ = math.MaxInt32
		for _, edgeIdx := range cheapestEdgeIndex {
			if edgeIdx < 0 {
				continue
			}
			cheapest := edges[edgeIdx]
			sourceRoot := findRoot(cheapest.Source) // @step:add-to-mst
			targetRoot := findRoot(cheapest.Target) // @step:add-to-mst
			if sourceRoot == targetRoot {
				continue // @step:add-to-mst
			}
			unionComponents(cheapest.Source, cheapest.Target) // @step:merge-components
			mstEdges = append(mstEdges, cheapest)             // @step:add-to-mst
			componentCount--                                   // @step:merge-components
		}
	}

	return mstEdges // @step:complete
}
