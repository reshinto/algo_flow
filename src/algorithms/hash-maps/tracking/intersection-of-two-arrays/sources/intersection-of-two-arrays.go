// Intersection of Two Arrays — find common elements using a hash set
package main

func intersectionOfTwoArrays(numbersA []int, numbersB []int) []int {
	setA := make(map[int]bool) // @step:initialize
	for _, num := range numbersA {
		setA[num] = true // @step:insert-key
	}
	result := []int{}
	for _, currentNum := range numbersB {
		if setA[currentNum] {
			// @step:lookup-key
			result = append(result, currentNum) // @step:key-found
			delete(setA, currentNum)
		}
	}
	return result // @step:complete
}
