// Sort Characters by Frequency — sort a string by character frequency using a frequency map + bucket sort
package main

import "strings"

func sortCharactersByFrequency(text string) string {
	freqMap := make(map[rune]int) // @step:initialize
	for _, currentChar := range text {
		freqMap[currentChar]++ // @step:increment-count
	}
	// Bucket sort: index = frequency, value = list of chars with that frequency
	buckets := make([][]rune, len(text)+1)
	for charVal, freq := range freqMap {
		buckets[freq] = append(buckets[freq], charVal) // @step:key-found
	}
	var builder strings.Builder
	for bucketIdx := len(buckets) - 1; bucketIdx >= 0; bucketIdx-- {
		for _, charVal := range buckets[bucketIdx] {
			builder.WriteString(strings.Repeat(string(charVal), bucketIdx)) // @step:key-found
		}
	}
	return builder.String() // @step:complete
}
