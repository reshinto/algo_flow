// Edmonds-Karp — max flow via BFS shortest augmenting paths (guaranteed O(VE^2))
package edmondskarp

import "math"

type FlowEdge struct {
	Target   string
	Capacity int
}

func edmondsKarp(
	adjacencyList map[string][]FlowEdge,
	sourceNodeId string,
	sinkNodeId string,
) int {
	residualCapacity := make(map[string]map[string]int) // @step:initialize
	for nodeId, edges := range adjacencyList {
		if residualCapacity[nodeId] == nil {
			residualCapacity[nodeId] = make(map[string]int)
		}
		for _, flowEdge := range edges {
			prev := residualCapacity[nodeId][flowEdge.Target]
			residualCapacity[nodeId][flowEdge.Target] = prev + flowEdge.Capacity // @step:initialize
			if residualCapacity[flowEdge.Target] == nil {
				residualCapacity[flowEdge.Target] = make(map[string]int)
			}
		}
	}

	maxFlow := 0 // @step:initialize

	// BFS to find shortest augmenting path; returns parent map or nil if no path
	bfsFindPath := func() map[string]string {
		parentMap := make(map[string]string)          // @step:enqueue
		visitedSet := map[string]bool{sourceNodeId: true} // @step:enqueue
		nodeQueue := []string{sourceNodeId}           // @step:enqueue

		for len(nodeQueue) > 0 {
			currentId := nodeQueue[0] // @step:dequeue
			nodeQueue = nodeQueue[1:] // @step:dequeue
			for neighborId, residual := range residualCapacity[currentId] { // @step:visit-node
				residualVal := residual // @step:visit-node
				if !visitedSet[neighborId] && residualVal > 0 {
					visitedSet[neighborId] = true             // @step:enqueue
					parentMap[neighborId] = currentId         // @step:enqueue
					nodeQueue = append(nodeQueue, neighborId) // @step:enqueue
					if neighborId == sinkNodeId {
						return parentMap // @step:enqueue
					}
				}
			}
		}
		return nil // @step:dequeue
	}

	parentMap := bfsFindPath() // @step:augment-flow
	for parentMap != nil {
		// Find bottleneck capacity along the path
		bottleneck := math.MaxInt32    // @step:augment-flow
		currentId := sinkNodeId        // @step:augment-flow
		for currentId != sourceNodeId {
			parentId := parentMap[currentId]                    // @step:augment-flow
			residual := residualCapacity[parentId][currentId]  // @step:augment-flow
			if residual < bottleneck {
				bottleneck = residual
			} // @step:augment-flow
			currentId = parentId // @step:augment-flow
		}

		// Update residual capacities along the path
		currentId = sinkNodeId // @step:augment-flow
		for currentId != sourceNodeId {
			parentId := parentMap[currentId]                              // @step:augment-flow
			fwd := residualCapacity[parentId][currentId]                 // @step:augment-flow
			residualCapacity[parentId][currentId] = fwd - bottleneck     // @step:augment-flow
			back := residualCapacity[currentId][parentId]                // @step:augment-flow
			residualCapacity[currentId][parentId] = back + bottleneck    // @step:augment-flow
			currentId = parentId                                         // @step:augment-flow
		}

		maxFlow += bottleneck  // @step:augment-flow
		parentMap = bfsFindPath() // @step:augment-flow
	}

	return maxFlow // @step:complete
}
