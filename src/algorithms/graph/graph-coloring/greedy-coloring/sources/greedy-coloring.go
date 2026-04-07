// Greedy Graph Coloring — assign smallest available color to each node in order
package greedycoloring

func greedyColoring(adjacencyList map[string][]string, nodeIds []string) map[string]int {
	colorAssignment := make(map[string]int) // @step:initialize

	for _, nodeId := range nodeIds {
		neighborColors := make(map[int]bool) // @step:visit-node
		neighbors := adjacencyList[nodeId]   // @step:visit-node
		for _, neighborId := range neighbors {
			if color, exists := colorAssignment[neighborId]; exists {
				neighborColors[color] = true // @step:visit-node
			}
		}

		assignedColor := 0 // @step:assign-color
		for neighborColors[assignedColor] {
			assignedColor++ // @step:assign-color
		}
		colorAssignment[nodeId] = assignedColor // @step:assign-color
	}

	return colorAssignment // @step:complete
}
