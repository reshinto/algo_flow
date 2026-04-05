// Asteroid Collision — use a stack to simulate asteroid collisions, resolving each pair by size
function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = []; // @step:initialize
  for (let asteroidIdx = 0; asteroidIdx < asteroids.length; asteroidIdx++) {
    const currentAsteroid = asteroids[asteroidIdx]!; // @step:visit
    let alive = true; // @step:visit
    // Collision occurs when the current asteroid moves left and the stack top moves right
    while (alive && currentAsteroid < 0 && stack.length > 0 && stack[stack.length - 1]! > 0) {
      const stackTop = stack[stack.length - 1]!; // @step:compare
      if (stackTop < -currentAsteroid) {
        // Stack top is smaller — it gets destroyed
        stack.pop(); // @step:pop
      } else if (stackTop === -currentAsteroid) {
        // Equal size — both are destroyed
        stack.pop(); // @step:match
        alive = false; // @step:match
      } else {
        // Stack top is larger — current asteroid is destroyed
        alive = false; // @step:mismatch
      }
    }
    if (alive) {
      stack.push(currentAsteroid); // @step:push
    }
  }
  return stack; // @step:complete
}
