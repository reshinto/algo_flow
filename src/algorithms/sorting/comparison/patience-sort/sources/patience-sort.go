// Patience Sort — place cards into piles using patience game rules, then merge piles
package main

import "math"

func findPileIndex(piles [][]int, cardValue int) int {
	// @step:compare
	// Binary search for the leftmost pile whose top is >= cardValue
	leftBound := 0          // @step:compare
	rightBound := len(piles) // @step:compare

	for leftBound < rightBound {
		// @step:compare
		midIndex := (leftBound + rightBound) / 2 // @step:compare
		if piles[midIndex][len(piles[midIndex])-1] < cardValue {
			// @step:compare
			leftBound = midIndex + 1 // @step:compare
		} else {
			rightBound = midIndex // @step:compare
		}
	}

	return leftBound // @step:compare
}

func mergePiles(piles [][]int) []int {
	// @step:merge-piles
	sortedOutput := []int{} // @step:merge-piles

	anyNonEmpty := func() bool {
		for _, pile := range piles {
			if len(pile) > 0 {
				return true
			}
		}
		return false
	}

	for anyNonEmpty() {
		// @step:merge-piles
		minimumValue := math.MaxInt64 // @step:compare
		minimumPileIndex := 0         // @step:compare

		for pileIndex := 0; pileIndex < len(piles); pileIndex++ {
			// @step:compare
			pileTop := piles[pileIndex][len(piles[pileIndex])-1] // @step:compare
			if pileTop < minimumValue {
				// @step:compare
				minimumValue = pileTop        // @step:compare
				minimumPileIndex = pileIndex  // @step:compare
			}
		}

		sortedOutput = append(sortedOutput, piles[minimumPileIndex][len(piles[minimumPileIndex])-1]) // @step:swap
		piles[minimumPileIndex] = piles[minimumPileIndex][:len(piles[minimumPileIndex])-1]
		if len(piles[minimumPileIndex]) == 0 {
			piles = append(piles[:minimumPileIndex], piles[minimumPileIndex+1:]...) // @step:merge-piles
		}
	}

	return sortedOutput // @step:merge-piles
}

func patienceSort(inputArray []int) []int {
	// @step:initialize
	arrayLength := len(inputArray) // @step:initialize

	if arrayLength == 0 {
		return []int{} // @step:complete
	}

	piles := [][]int{} // @step:initialize

	// Place each card into the leftmost valid pile
	for cardIndex := 0; cardIndex < arrayLength; cardIndex++ {
		// @step:place-card
		cardValue := inputArray[cardIndex]         // @step:place-card
		targetPileIndex := findPileIndex(piles, cardValue) // @step:compare

		if targetPileIndex == len(piles) {
			piles = append(piles, []int{cardValue}) // @step:place-card
		} else {
			piles[targetPileIndex] = append(piles[targetPileIndex], cardValue) // @step:place-card
		}
	}

	// Merge all piles into sorted output
	sortedArray := mergePiles(piles) // @step:merge-piles

	// @step:mark-sorted
	return sortedArray // @step:complete
}
