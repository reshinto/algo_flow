// DFS — traverse depth-first using a LIFO stack
package dfs

func depthFirstSearch(adjacencyList map[string][]string, startNodeId string) []string {
	visitOrder := make([]string, 0)      // @step:initialize
	visitedSet := make(map[string]bool) // @step:initialize
	nodeStack := []string{startNodeId}  // @step:initialize,push-stack

	for len(nodeStack) > 0 {
		currentNodeId := nodeStack[len(nodeStack)-1] // @step:pop-stack
		nodeStack = nodeStack[:len(nodeStack)-1]      // @step:pop-stack
		if visitedSet[currentNodeId] {
			continue // @step:pop-stack
		}
		visitedSet[currentNodeId] = true                       // @step:visit
		visitOrder = append(visitOrder, currentNodeId)         // @step:visit

		neighbors := adjacencyList[currentNodeId]
		for _, neighborId := range neighbors {
			if !visitedSet[neighborId] {
				// @step:visit-edge
				nodeStack = append(nodeStack, neighborId) // @step:visit-edge,push-stack
			}
		}
	}
	return visitOrder // @step:complete
}
