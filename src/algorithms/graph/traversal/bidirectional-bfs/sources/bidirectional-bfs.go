// Bidirectional BFS — two simultaneous frontiers from start and target meeting in the middle
package bidirectionalbfs

func bidirectionalBFS(
	adjacencyList map[string][]string,
	startNodeId string,
	targetNodeId string,
) []string {
	if startNodeId == targetNodeId {
		return []string{startNodeId} // @step:initialize
	}

	forwardVisited := make(map[string]string)  // @step:initialize
	backwardVisited := make(map[string]string) // @step:initialize
	forwardQueue := []string{startNodeId}      // @step:initialize
	backwardQueue := []string{targetNodeId}    // @step:initialize
	forwardVisited[startNodeId] = ""           // @step:initialize
	backwardVisited[targetNodeId] = ""         // @step:initialize

	// Build undirected neighbor lookup by merging both edge directions
	undirectedNeighbors := make(map[string][]string)
	for nodeId, neighbors := range adjacencyList {
		undirectedNeighbors[nodeId] = append(undirectedNeighbors[nodeId], neighbors...)
		for _, neighborId := range neighbors {
			found := false
			for _, existing := range undirectedNeighbors[neighborId] {
				if existing == nodeId {
					found = true
					break
				}
			}
			if !found {
				undirectedNeighbors[neighborId] = append(undirectedNeighbors[neighborId], nodeId)
			}
		}
	}

	reconstructPath := func(meetingNodeId string) []string {
		forwardPath := make([]string, 0)
		currentNode := meetingNodeId
		for currentNode != "" {
			forwardPath = append([]string{currentNode}, forwardPath...)
			currentNode = forwardVisited[currentNode]
		}
		backwardPath := make([]string, 0)
		backNode := backwardVisited[meetingNodeId]
		for backNode != "" {
			backwardPath = append(backwardPath, backNode)
			backNode = backwardVisited[backNode]
		}
		return append(forwardPath, backwardPath...)
	}

	for len(forwardQueue) > 0 || len(backwardQueue) > 0 {
		// Expand the forward frontier one level
		if len(forwardQueue) > 0 {
			currentNodeId := forwardQueue[0]  // @step:dequeue
			forwardQueue = forwardQueue[1:]   // @step:dequeue
			forwardNeighbors := undirectedNeighbors[currentNodeId]
			for _, neighborId := range forwardNeighbors {
				// @step:visit-edge
				if _, visited := forwardVisited[neighborId]; !visited {
					forwardVisited[neighborId] = currentNodeId               // @step:visit-edge
					forwardQueue = append(forwardQueue, neighborId)         // @step:visit-edge,enqueue
					if _, inBackward := backwardVisited[neighborId]; inBackward {
						// @step:complete
						return reconstructPath(neighborId) // @step:complete
					}
				}
			}
		}

		// Expand the backward frontier one level
		if len(backwardQueue) > 0 {
			currentNodeId := backwardQueue[0]   // @step:dequeue
			backwardQueue = backwardQueue[1:]   // @step:dequeue
			backwardNeighbors := undirectedNeighbors[currentNodeId]
			for _, neighborId := range backwardNeighbors {
				// @step:visit-edge
				if _, visited := backwardVisited[neighborId]; !visited {
					backwardVisited[neighborId] = currentNodeId               // @step:visit-edge
					backwardQueue = append(backwardQueue, neighborId)         // @step:visit-edge,enqueue
					if _, inForward := forwardVisited[neighborId]; inForward {
						// @step:complete
						return reconstructPath(neighborId) // @step:complete
					}
				}
			}
		}
	}

	return nil // @step:complete
}
