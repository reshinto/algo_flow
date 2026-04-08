// Character Frequency Sort
// Sorts a string by character frequency (descending) using bucket sort.
// Time: O(n) where n = length of text (bucket sort avoids O(n log n) comparison sort)
// Space: O(n) — frequency map and output string both scale with input size

package main

import "strings"

func characterFrequencySort(text string) string {
	if len(text) == 0 { return "" } // @step:initialize

	frequencyMap := make(map[rune]int) // @step:initialize

	for _, ch := range text {
		// @step:update-frequency
		frequencyMap[ch]++ // @step:update-frequency
	}

	// Bucket sort: index = frequency, value = list of chars with that frequency
	maxFrequency := len(text) // @step:sort-by-frequency
	buckets := make([][]rune, maxFrequency+1) // @step:sort-by-frequency

	for ch, freq := range frequencyMap {
		// @step:sort-by-frequency
		buckets[freq] = append(buckets[freq], ch) // @step:sort-by-frequency
	}

	var resultBuilder strings.Builder // @step:build-output
	for freqIdx := maxFrequency; freqIdx >= 1; freqIdx-- {
		// @step:build-output
		for _, ch := range buckets[freqIdx] {
			// @step:add-to-result
			resultBuilder.WriteString(strings.Repeat(string(ch), freqIdx)) // @step:add-to-result
		}
	}

	return resultBuilder.String() // @step:complete
}
