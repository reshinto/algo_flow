// Boyer-Moore Voting Algorithm — O(n) majority element via candidate cancellation
package boyermorevoting

func boyerMooreVoting(inputArray []int) (majorityElement int, count int) {
	if len(inputArray) == 0 {
		// @step:initialize
		return -1, 0 // @step:initialize
	}

	candidate := inputArray[0] // @step:initialize
	voteCount := 0             // @step:initialize

	// Phase 1: Find candidate using cancellation
	for elementIndex := 0; elementIndex < len(inputArray); elementIndex++ {
		currentElement := inputArray[elementIndex] // @step:visit

		if voteCount == 0 { // @step:compare
			candidate = currentElement // @step:compare
			voteCount = 1              // @step:compare
		} else if currentElement == candidate {
			voteCount++ // @step:visit
		} else {
			voteCount-- // @step:visit
		}
	}

	return candidate, voteCount // @step:complete
}
