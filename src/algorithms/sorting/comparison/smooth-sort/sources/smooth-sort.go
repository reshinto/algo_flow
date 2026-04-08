// Smooth Sort — Leonardo heap variant of heap sort; adaptive O(n) best case on nearly-sorted data
package main

func smoothSort(inputArray []int) []int {
	// @step:initialize
	sortedArray := make([]int, len(inputArray)) // @step:initialize
	copy(sortedArray, inputArray)               // @step:initialize
	arrayLength := len(sortedArray)             // @step:initialize

	if arrayLength <= 1 {
		return sortedArray // @step:initialize
	}

	// Precompute Leonardo numbers up to at least arrayLength
	leonardoNumbers := []int{1, 1}
	for leonardoNumbers[len(leonardoNumbers)-1] < arrayLength {
		length := len(leonardoNumbers)
		leonardoNumbers = append(leonardoNumbers, leonardoNumbers[length-1]+leonardoNumbers[length-2]+1)
	}

	var siftSmooth func(rootIndex, order int)
	siftSmooth = func(rootIndex, order int) {
		// @step:build-heap
		currentRoot := rootIndex
		currentOrder := order

		for currentOrder >= 2 {
			rightChild := currentRoot - 1                             // @step:compare
			leftChild := currentRoot - 1 - leonardoNumbers[currentOrder-1] // @step:compare

			largestIndex := currentRoot
			if sortedArray[rightChild] > sortedArray[largestIndex] {
				largestIndex = rightChild // @step:compare
			}
			if sortedArray[leftChild] > sortedArray[largestIndex] {
				largestIndex = leftChild // @step:compare
			}

			if largestIndex == currentRoot {
				break
			}

			// @step:swap
			sortedArray[currentRoot], sortedArray[largestIndex] = sortedArray[largestIndex], sortedArray[currentRoot] // @step:swap

			if largestIndex == rightChild {
				currentOrder--
			} else {
				currentOrder -= 2
			}
			currentRoot = largestIndex
		}
	}

	var trinkle func(rootIndex, order int, prevPositions, prevOrders []int)
	trinkle = func(rootIndex, order int, prevPositions, prevOrders []int) {
		// @step:build-heap
		currentRoot := rootIndex
		currentOrder := order
		positions := append([]int{}, prevPositions...)
		orders := append([]int{}, prevOrders...)

		for len(positions) > 0 {
			prevRootIndex := positions[len(positions)-1]
			prevRootOrder := orders[len(orders)-1]

			if sortedArray[currentRoot] >= sortedArray[prevRootIndex] {
				break // @step:compare
			}

			if currentOrder >= 2 {
				rightChild := currentRoot - 1
				leftChild := currentRoot - 1 - leonardoNumbers[currentOrder-1]
				if sortedArray[prevRootIndex] < sortedArray[rightChild] ||
					sortedArray[prevRootIndex] < sortedArray[leftChild] {
					break // @step:compare
				}
			}

			// @step:swap
			sortedArray[currentRoot], sortedArray[prevRootIndex] = sortedArray[prevRootIndex], sortedArray[currentRoot] // @step:swap

			positions = positions[:len(positions)-1]
			orders = orders[:len(orders)-1]
			currentRoot = prevRootIndex
			currentOrder = prevRootOrder
		}

		siftSmooth(currentRoot, currentOrder)
	}

	// Build the Leonardo heap forest incrementally.
	heapPositions := []int{}
	heapOrders := []int{}

	for buildIndex := 0; buildIndex < arrayLength; buildIndex++ {
		// @step:build-heap
		rootCount := len(heapOrders)
		if rootCount >= 2 && heapOrders[rootCount-1] == heapOrders[rootCount-2]+1 {
			newOrder := heapOrders[rootCount-1] + 1
			heapPositions = heapPositions[:rootCount-2]
			heapOrders = heapOrders[:rootCount-2]
			heapPositions = append(heapPositions, buildIndex)
			heapOrders = append(heapOrders, newOrder)
		} else if rootCount >= 1 && heapOrders[rootCount-1] == 1 {
			heapPositions = append(heapPositions, buildIndex)
			heapOrders = append(heapOrders, 0)
		} else {
			heapPositions = append(heapPositions, buildIndex)
			heapOrders = append(heapOrders, 1)
		}

		lastIndex := len(heapPositions) - 1
		prevPos := append([]int{}, heapPositions[:lastIndex]...)
		prevOrd := append([]int{}, heapOrders[:lastIndex]...)
		trinkle(heapPositions[lastIndex], heapOrders[lastIndex], prevPos, prevOrd)
	}

	// Extract phase: shrink the heap forest from the right, exposing sorted elements.
	for extractIndex := arrayLength - 1; extractIndex >= 0; extractIndex-- {
		// @step:extract
		currentOrder := heapOrders[len(heapOrders)-1]
		heapPositions = heapPositions[:len(heapPositions)-1]
		heapOrders = heapOrders[:len(heapOrders)-1]

		if currentOrder >= 2 {
			rightRoot := extractIndex - 1
			leftRoot := extractIndex - 1 - leonardoNumbers[currentOrder-1]
			heapPositions = append(heapPositions, leftRoot)
			heapOrders = append(heapOrders, currentOrder-2)
			heapPositions = append(heapPositions, rightRoot)
			heapOrders = append(heapOrders, currentOrder-1)

			lastIndex := len(heapPositions) - 1
			prevLeftPos := append([]int{}, heapPositions[:lastIndex-1]...)
			prevLeftOrd := append([]int{}, heapOrders[:lastIndex-1]...)
			trinkle(leftRoot, currentOrder-2, prevLeftPos, prevLeftOrd)
			prevRightPos := append([]int{}, heapPositions[:lastIndex]...)
			prevRightOrd := append([]int{}, heapOrders[:lastIndex]...)
			trinkle(rightRoot, currentOrder-1, prevRightPos, prevRightOrd)
		}

		// @step:mark-sorted
	}

	return sortedArray // @step:complete
}
