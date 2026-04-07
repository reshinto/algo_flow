// Cartesian Product
// Generates all ordered pairs (a, b) where a ∈ setA and b ∈ setB.
// Time: O(n × m) — one pair per combination of elements
// Space: O(n × m) for the result array

package main

import "fmt"

type Pair struct {
	elemA, elemB int
}

func cartesianProduct(setA []int, setB []int) []Pair {
	result := make([]Pair, 0) // @step:initialize

	for _, elemA := range setA {
		for _, elemB := range setB {
			result = append(result, Pair{elemA, elemB}) // @step:generate-pair
		}
	}

	return result // @step:complete
}

func main() {
	setA := []int{1, 2, 3}
	setB := []int{4, 5}
	result := cartesianProduct(setA, setB)
	fmt.Println(result)
}
