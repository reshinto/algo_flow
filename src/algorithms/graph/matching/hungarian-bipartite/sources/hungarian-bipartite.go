// Hungarian Bipartite Matching (Kuhn's Algorithm) — maximum matching via augmenting paths
package hungarianbip

func hungarianMatching(
	adjacencyList map[string][]string,
	leftNodes []string,
	rightNodes []string,
) map[string]string {
	matchLeft := make(map[string]string)  // @step:initialize
	matchRight := make(map[string]string) // @step:initialize

	var tryAugment func(leftNode string, visitedRight map[string]bool) bool
	tryAugment = func(leftNode string, visitedRight map[string]bool) bool {
		neighbors := adjacencyList[leftNode] // @step:visit-edge
		for _, rightNode := range neighbors {
			// @step:visit-edge
			if visitedRight[rightNode] {
				continue // @step:visit-edge
			}
			visitedRight[rightNode] = true // @step:visit-edge

			currentOwner, ownerExists := matchRight[rightNode] // @step:visit-edge
			if !ownerExists || tryAugment(currentOwner, visitedRight) {
				matchLeft[leftNode] = rightNode  // @step:match-edge
				matchRight[rightNode] = leftNode // @step:match-edge
				return true                      // @step:match-edge
			}
		}
		return false // @step:visit-edge
	}

	for _, leftNode := range leftNodes {
		// @step:initialize
		visitedRight := make(map[string]bool) // @step:initialize
		tryAugment(leftNode, visitedRight)    // @step:visit
	}

	return matchLeft // @step:complete
}
