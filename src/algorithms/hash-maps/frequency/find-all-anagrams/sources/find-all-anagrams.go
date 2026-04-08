// Find All Anagrams — slide a window over text and record start indices where window is an anagram of pattern
package main

func mapsEqual(mapA map[rune]int, mapB map[rune]int) bool {
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

func findAllAnagrams(text string, pattern string) []int {
	textRunes := []rune(text)
	patternRunes := []rune(pattern)
	patternFreq := make(map[rune]int) // @step:initialize
	for _, patternChar := range patternRunes {
		patternFreq[patternChar]++ // @step:increment-count
	}
	windowFreq := make(map[rune]int)
	windowSize := len(patternRunes)
	result := []int{}
	for rightIdx := 0; rightIdx < len(textRunes); rightIdx++ {
		// Expand window: add incoming character
		incomingChar := textRunes[rightIdx]
		windowFreq[incomingChar]++ // @step:expand-window
		// Shrink window: remove outgoing character once full window is established
		if rightIdx >= windowSize {
			outgoingChar := textRunes[rightIdx-windowSize]
			windowFreq[outgoingChar]-- // @step:shrink-window
			if windowFreq[outgoingChar] == 0 {
				delete(windowFreq, outgoingChar) // @step:decrement-count
			}
			// @step:decrement-count
		}
		// Check if current window matches pattern frequency map
		if rightIdx >= windowSize-1 {
			if mapsEqual(windowFreq, patternFreq) {
				result = append(result, rightIdx-windowSize+1) // @step:key-found
			}
		}
	}
	return result // @step:complete
}
