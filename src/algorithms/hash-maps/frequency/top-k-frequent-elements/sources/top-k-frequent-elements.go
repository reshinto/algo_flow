// Top K Frequent Elements — find the k most frequent elements using frequency map + bucket sort
package main

func topKFrequentElements(numbers []int, topK int) []int {
	freqMap := make(map[int]int) // @step:initialize
	for _, current := range numbers {
		freqMap[current]++ // @step:increment-count
	}
	// Bucket sort: index = frequency, value = list of elements with that frequency
	buckets := make([][]int, len(numbers)+1)
	for num, freq := range freqMap {
		buckets[freq] = append(buckets[freq], num) // @step:key-found
	}
	result := []int{}
	for bucketIdx := len(buckets) - 1; bucketIdx >= 0 && len(result) < topK; bucketIdx-- {
		for _, num := range buckets[bucketIdx] {
			result = append(result, num) // @step:key-found
			if len(result) == topK {
				break
			}
		}
	}
	return result // @step:complete
}
