// Kruskal's Algorithm — build MST by sorting edges and merging components with Union-Find
package kruskals

import "sort"

type WeightedEdge struct {
	Source string
	Target string
	Weight int
}

func kruskalsAlgorithm(edges []WeightedEdge, nodeIds []string) []WeightedEdge {
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

	unionComponents := func(nodeA string, nodeB string) bool {
		// @step:initialize
		rootA := findRoot(nodeA) // @step:initialize
		rootB := findRoot(nodeB) // @step:initialize
		if rootA == rootB {
			return false // @step:initialize
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
		return true // @step:initialize
	}

	sortedEdges := make([]WeightedEdge, len(edges))
	copy(sortedEdges, edges)
	sort.Slice(sortedEdges, func(edgeA, edgeB int) bool {
		return sortedEdges[edgeA].Weight < sortedEdges[edgeB].Weight
	}) // @step:sort-edges

	for _, edge := range sortedEdges {
		sourceRoot := findRoot(edge.Source) // @step:visit-edge
		targetRoot := findRoot(edge.Target) // @step:visit-edge

		if sourceRoot != targetRoot {
			// @step:visit-edge
			unionComponents(edge.Source, edge.Target) // @step:add-to-mst
			mstEdges = append(mstEdges, edge)         // @step:add-to-mst
		}
		// else: edge would create a cycle — reject it // @step:reject-edge

		if len(mstEdges) == len(nodeIds)-1 {
			break // @step:add-to-mst
		}
	}

	return mstEdges // @step:complete
}
