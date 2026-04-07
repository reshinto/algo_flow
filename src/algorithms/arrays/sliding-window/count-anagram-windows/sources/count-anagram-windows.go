// Count Anagram Windows — O(n) sliding window with frequency map comparison
package countanagramwindows

func countAnagramWindows(text []int, pattern []int) (int, []int) {
	patternLength := len(pattern)
	textLength := len(text)

	if patternLength == 0 || patternLength > textLength {
		// @step:initialize
		return 0, []int{} // @step:initialize
	}

	patternFrequency := map[int]int{} // @step:initialize
	windowFrequency := map[int]int{}  // @step:initialize
	positions := []int{}

	// Build pattern frequency map
	for _, patternElement := range pattern { // @step:initialize
		patternFrequency[patternElement]++ // @step:initialize
	}

	// Build initial window frequency map
	for initIndex := 0; initIndex < patternLength; initIndex++ { // @step:move-window
		currentElement := text[initIndex]    // @step:move-window
		windowFrequency[currentElement]++    // @step:move-window
	}

	// Helper: compare two frequency maps for equality
	mapsAreEqual := func(mapA, mapB map[int]int) bool {
		if len(mapA) != len(mapB) {
			return false
		}
		for key, value := range mapA {
			if mapB[key] != value {
				return false
			}
		}
		return true
	}

	// Check first window
	if mapsAreEqual(patternFrequency, windowFrequency) { // @step:compare
		positions = append(positions, 0) // @step:compare
	}

	// Slide window across remaining positions
	for rightIndex := patternLength; rightIndex < textLength; rightIndex++ {
		leftIndex := rightIndex - patternLength
		outgoingElement := text[leftIndex]  // @step:shrink-window
		incomingElement := text[rightIndex] // @step:expand-window

		// Remove outgoing element from window
		outgoingCount := windowFrequency[outgoingElement] - 1 // @step:shrink-window
		if outgoingCount == 0 {                               // @step:shrink-window
			delete(windowFrequency, outgoingElement) // @step:shrink-window
		} else {
			windowFrequency[outgoingElement] = outgoingCount // @step:shrink-window
		}

		// Add incoming element to window
		windowFrequency[incomingElement]++ // @step:expand-window

		if mapsAreEqual(patternFrequency, windowFrequency) { // @step:compare
			positions = append(positions, leftIndex+1) // @step:compare
		}
	}

	return len(positions), positions // @step:complete
}
