// Reverse Words in a String — split, reverse word order, rejoin with single spaces.
// Trims leading/trailing whitespace and collapses multiple spaces between words.
// Time: O(n)  Space: O(n)

package main

import "strings"

func reverseWords(text string) string {
	words := strings.Fields(text) // @step:initialize

	leftIndex := 0 // @step:initialize
	rightIndex := len(words) - 1 // @step:initialize

	for leftIndex < rightIndex {
		leftWord := words[leftIndex] // @step:read-char
		rightWord := words[rightIndex] // @step:read-char

		words[leftIndex] = rightWord // @step:swap-pointers
		words[rightIndex] = leftWord // @step:swap-pointers

		leftIndex++ // @step:visit
		rightIndex-- // @step:visit
	}

	return strings.Join(words, " ") // @step:complete
}
