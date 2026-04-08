// Generate Binary Numbers — use a BFS-style queue to produce binary representations of 1 through N
package main

import "fmt"

func generateBinaryNumbers(count int) []string {
	queue := []string{"1"} // @step:initialize
	result := []string{} // @step:initialize
	for generationIdx := 0; generationIdx < count; generationIdx++ {
		current := queue[0] // @step:dequeue
		queue = queue[1:] // @step:dequeue
		result = append(result, current) // @step:dequeue
		queue = append(queue, current+"0") // @step:enqueue
		queue = append(queue, current+"1") // @step:enqueue
	}
	return result // @step:complete
}

func main() {
	fmt.Println(generateBinaryNumbers(5))
}
