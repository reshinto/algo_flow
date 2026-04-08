// Union-Find Cycle Detection — detect cycles by checking if two endpoints share a component
package unionfindcycle

type Edge struct {
	Source string
	Target string
}

func unionFindCycle(edges []Edge, nodeIds []string) bool {
	parent := make(map[string]string) // @step:initialize
	rank := make(map[string]int)       // @step:initialize
	for _, nodeId := range nodeIds {
		// @step:initialize
		parent[nodeId] = nodeId // @step:initialize
		rank[nodeId] = 0        // @step:initialize
	}

	var findRoot func(nodeId string) string
	findRoot = func(nodeId string) string {
		if parent[nodeId] != nodeId {
			parent[nodeId] = findRoot(parent[nodeId])
		}
		return parent[nodeId]
	}

	unionComponents := func(nodeA string, nodeB string) {
		rootA := findRoot(nodeA)
		rootB := findRoot(nodeB)
		if rank[rootA] < rank[rootB] {
			parent[rootA] = rootB
		} else if rank[rootA] > rank[rootB] {
			parent[rootB] = rootA
		} else {
			parent[rootB] = rootA
			rank[rootA]++
		}
	}

	for _, edge := range edges {
		sourceRoot := findRoot(edge.Source) // @step:visit-edge
		targetRoot := findRoot(edge.Target) // @step:visit-edge

		if sourceRoot == targetRoot {
			// @step:visit-edge
			return true // @step:complete
		}

		unionComponents(edge.Source, edge.Target) // @step:merge-components
	}

	return false // @step:complete
}
