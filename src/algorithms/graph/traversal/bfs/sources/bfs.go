// BFS — traverse level-by-level using a FIFO queue
package bfs

func breadthFirstSearch(adjacencyList map[string][]string, startNodeId string) []string {
	visitOrder := make([]string, 0)      // @step:initialize
	visitedSet := make(map[string]bool) // @step:initialize
	nodeQueue := []string{startNodeId}  // @step:initialize
	visitedSet[startNodeId] = true       // @step:initialize

	for len(nodeQueue) > 0 {
		currentNodeId := nodeQueue[0] // @step:dequeue
		nodeQueue = nodeQueue[1:]     // @step:dequeue
		visitOrder = append(visitOrder, currentNodeId) // @step:dequeue,visit
		neighbors := adjacencyList[currentNodeId]
		// Mark as visited when enqueuing to avoid duplicate queue entries
		for _, neighborId := range neighbors {
			if !visitedSet[neighborId] {
				// @step:visit-edge
				visitedSet[neighborId] = true              // @step:visit-edge
				nodeQueue = append(nodeQueue, neighborId) // @step:visit-edge,enqueue
			}
		}
	}
	return visitOrder // @step:complete
}
