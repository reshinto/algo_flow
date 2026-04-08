// Tournament Sort — build a tournament tree of comparisons, extract winner, replace and rebuild
package main

import "math"

const tournamentInfinity = math.MaxInt64

func buildTournamentTree(leaves []int) []int {
	// @step:build-tournament
	leafCount := len(leaves)                      // @step:build-tournament
	treeSize := 2 * leafCount                     // @step:build-tournament
	tree := make([]int, treeSize)                 // @step:build-tournament
	for idx := range tree {
		tree[idx] = tournamentInfinity
	}

	// Place leaf values in second half of tree
	for leafIndex := 0; leafIndex < leafCount; leafIndex++ {
		// @step:build-tournament
		tree[leafCount+leafIndex] = leaves[leafIndex] // @step:build-tournament
	}

	// Build internal nodes (winners) bottom-up
	for nodeIndex := leafCount - 1; nodeIndex >= 1; nodeIndex-- {
		// @step:compare
		leftChild := 2 * nodeIndex  // @step:compare
		rightChild := 2*nodeIndex + 1 // @step:compare
		if tree[leftChild] <= tree[rightChild] {
			tree[nodeIndex] = tree[leftChild] // @step:compare
		} else {
			tree[nodeIndex] = tree[rightChild]
		}
	}

	return tree // @step:build-tournament
}

func extractWinnerAndRebuild(tree []int, leafCount int) int {
	// @step:extract-winner
	winner := tree[1] // @step:extract-winner

	// Find the leaf position that held the winner and replace with infinity
	nodeIndex := 1 // @step:extract-winner
	for nodeIndex < leafCount {
		// @step:compare
		leftChild := 2 * nodeIndex  // @step:compare
		rightChild := 2*nodeIndex + 1 // @step:compare
		if tree[leftChild] == winner {
			nodeIndex = leftChild // @step:compare
		} else {
			nodeIndex = rightChild
		}
	}

	tree[nodeIndex] = tournamentInfinity // @step:extract-winner

	// Rebuild internal nodes from the modified leaf upward
	nodeIndex /= 2 // @step:build-tournament
	for nodeIndex >= 1 {
		// @step:build-tournament
		leftChild := 2 * nodeIndex  // @step:build-tournament
		rightChild := 2*nodeIndex + 1 // @step:build-tournament
		if tree[leftChild] <= tree[rightChild] {
			tree[nodeIndex] = tree[leftChild] // @step:compare
		} else {
			tree[nodeIndex] = tree[rightChild]
		}
		nodeIndex /= 2 // @step:build-tournament
	}

	return winner // @step:extract-winner
}

func tournamentSort(inputArray []int) []int {
	// @step:initialize
	arrayLength := len(inputArray) // @step:initialize

	if arrayLength == 0 {
		return []int{} // @step:complete
	}

	leaves := make([]int, arrayLength)   // @step:initialize
	copy(leaves, inputArray)             // @step:initialize
	tree := buildTournamentTree(leaves)  // @step:build-tournament
	sortedArray := make([]int, 0, arrayLength) // @step:extract-winner

	for extractIndex := 0; extractIndex < arrayLength; extractIndex++ {
		// @step:extract-winner
		winner := extractWinnerAndRebuild(tree, len(leaves)) // @step:extract-winner
		sortedArray = append(sortedArray, winner)            // @step:mark-sorted
	}

	// @step:mark-sorted
	return sortedArray // @step:complete
}
