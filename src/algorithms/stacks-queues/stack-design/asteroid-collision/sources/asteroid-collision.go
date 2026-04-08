// Asteroid Collision — use a stack to simulate asteroid collisions, resolving each pair by size
package main

import "fmt"

func asteroidCollision(asteroids []int) []int {
	stack := []int{} // @step:initialize
	for asteroidIdx := 0; asteroidIdx < len(asteroids); asteroidIdx++ {
		currentAsteroid := asteroids[asteroidIdx] // @step:visit
		alive := true // @step:visit
		// Collision occurs when the current asteroid moves left and the stack top moves right
		for alive && currentAsteroid < 0 && len(stack) > 0 && stack[len(stack)-1] > 0 {
			stackTop := stack[len(stack)-1] // @step:compare
			if stackTop < -currentAsteroid {
				// Stack top is smaller — it gets destroyed
				stack = stack[:len(stack)-1] // @step:pop
			} else if stackTop == -currentAsteroid {
				// Equal size — both are destroyed
				stack = stack[:len(stack)-1] // @step:match
				alive = false // @step:match
			} else {
				// Stack top is larger — current asteroid is destroyed
				alive = false // @step:mismatch
			}
		}
		if alive {
			stack = append(stack, currentAsteroid) // @step:push
		}
	}
	return stack // @step:complete
}

func main() {
	fmt.Println(asteroidCollision([]int{5, 10, -5}))
}
