// Max Frequency Stack — pop the most frequent element using a frequency map and stack-of-stacks
package main

import "fmt"

func maxFrequencyStack(values []int) []int {
	freqMap := map[int]int{} // @step:initialize
	freqStacks := map[int][]int{} // @step:initialize
	maxFrequency := 0 // @step:initialize
	popResults := []int{} // @step:initialize

	// Push phase: update frequency map and push each value onto its frequency-level stack
	for elementIdx := 0; elementIdx < len(values); elementIdx++ {
		currentValue := values[elementIdx] // @step:visit
		currentFreq := freqMap[currentValue] + 1 // @step:compare
		freqMap[currentValue] = currentFreq // @step:compare
		if currentFreq > maxFrequency {
			maxFrequency = currentFreq // @step:compare
		}
		freqStacks[currentFreq] = append(freqStacks[currentFreq], currentValue) // @step:push
	}

	// Pop phase: always pop from the highest-frequency stack
	for maxFrequency > 0 {
		topStack := freqStacks[maxFrequency] // @step:pop
		popped := topStack[len(topStack)-1] // @step:pop
		freqStacks[maxFrequency] = topStack[:len(topStack)-1] // @step:pop
		freqMap[popped]-- // @step:pop
		if len(freqStacks[maxFrequency]) == 0 {
			maxFrequency-- // @step:pop
		}
		popResults = append(popResults, popped) // @step:pop
	}

	return popResults // @step:complete
}

func main() {
	fmt.Println(maxFrequencyStack([]int{5, 7, 5, 7, 4, 5}))
}
