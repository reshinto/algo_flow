// Library Sort (Gapped Insertion Sort) — insert into a gapped array, rebalance when gaps fill
package main

func librarySort(inputArray []int) []int {
	// @step:initialize
	arrayLength := len(inputArray) // @step:initialize
	if arrayLength <= 1 {
		return append([]int{}, inputArray...) // @step:initialize
	}

	// Use a gap factor: allocate extra space for gaps between elements
	gapFactor := 2
	gappedSize := arrayLength*gapFactor + 1    // @step:initialize
	gappedArray := make([]*int, gappedSize)    // @step:initialize
	filledCount := 0                           // @step:initialize

	// Place the first element at the center of the gapped array
	centerPosition := gappedSize / 2 // @step:initialize
	firstVal := inputArray[0]
	gappedArray[centerPosition] = &firstVal // @step:initialize
	filledCount = 1                         // @step:initialize

	for outerIndex := 1; outerIndex < arrayLength; outerIndex++ {
		currentElement := inputArray[outerIndex] // @step:find-position

		// Collect sorted filled values to binary search among them
		filledValues := []int{}    // @step:find-position
		filledPositions := []int{} // @step:find-position
		for scanIndex := 0; scanIndex < gappedSize; scanIndex++ {
			// @step:find-position
			if gappedArray[scanIndex] != nil {
				filledValues = append(filledValues, *gappedArray[scanIndex])   // @step:find-position
				filledPositions = append(filledPositions, scanIndex) // @step:find-position
			}
		}

		// Binary search in filled values to find insertion rank
		searchLeft := 0                     // @step:compare
		searchRight := len(filledValues) - 1 // @step:compare
		insertRank := len(filledValues)      // @step:compare

		for searchLeft <= searchRight {
			// @step:compare
			midRank := (searchLeft + searchRight) / 2 // @step:compare
			if currentElement < filledValues[midRank] {
				// @step:compare
				insertRank = midRank         // @step:compare
				searchRight = midRank - 1   // @step:compare
			} else {
				searchLeft = midRank + 1 // @step:compare
			}
		}

		// Determine insertion position in the gapped array
		var insertPosition int // @step:swap
		if insertRank == 0 {
			// @step:swap
			insertPosition = filledPositions[0] // @step:swap
		} else if insertRank >= len(filledPositions) {
			insertPosition = filledPositions[len(filledPositions)-1] + 1 // @step:swap
		} else {
			// Insert between rank-1 and rank — pick the position after the rank-1 element
			insertPosition = filledPositions[insertRank-1] + 1 // @step:swap
		}

		// Clamp to valid range
		if insertPosition >= gappedSize {
			insertPosition = gappedSize - 1 // @step:swap
		}

		// Find a gap near the insertion position and insert
		// Search right for a nil gap
		rightSearch := insertPosition // @step:swap
		for rightSearch < gappedSize && gappedArray[rightSearch] != nil {
			rightSearch++ // @step:swap
		}

		if rightSearch < gappedSize {
			// Shift elements right to open the gap at insertPosition
			for shiftPos := rightSearch; shiftPos > insertPosition; shiftPos-- {
				// @step:swap
				gappedArray[shiftPos] = gappedArray[shiftPos-1] // @step:swap
			}
			val := currentElement
			gappedArray[insertPosition] = &val // @step:swap
		} else {
			// No gap to the right — search left
			leftSearch := insertPosition - 1 // @step:swap
			for leftSearch >= 0 && gappedArray[leftSearch] != nil {
				leftSearch-- // @step:swap
			}
			if leftSearch >= 0 {
				for shiftPos := leftSearch; shiftPos < insertPosition-1; shiftPos++ {
					// @step:swap
					gappedArray[shiftPos] = gappedArray[shiftPos+1] // @step:swap
				}
				val := currentElement
				gappedArray[insertPosition-1] = &val // @step:swap
			}
		}
		filledCount++ // @step:swap

		// Rebalance (redistribute with gaps) if the array is more than half full
		if filledCount >= gappedSize/2 {
			// @step:rebalance
			filled := []int{} // @step:rebalance
			for _, val := range gappedArray {
				if val != nil {
					filled = append(filled, *val) // @step:rebalance
				}
			}
			for clearIdx := range gappedArray {
				gappedArray[clearIdx] = nil // @step:rebalance
			}
			spacing := gappedSize / (len(filled) + 1) // @step:rebalance
			for rebalanceIndex := 0; rebalanceIndex < len(filled); rebalanceIndex++ {
				// @step:rebalance
				val := filled[rebalanceIndex]
				gappedArray[(rebalanceIndex+1)*spacing] = &val // @step:rebalance
			}
		}

		// @step:mark-sorted
	}

	// Collect the result in order, filtering out nils
	resultArray := []int{} // @step:complete
	for _, val := range gappedArray {
		if val != nil {
			resultArray = append(resultArray, *val) // @step:complete
		}
	}
	return resultArray // @step:complete
}
