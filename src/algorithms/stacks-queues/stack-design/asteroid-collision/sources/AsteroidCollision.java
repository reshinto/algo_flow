// Asteroid Collision — use a stack to simulate asteroid collisions, resolving each pair by size
import java.util.ArrayDeque;
import java.util.Deque;

public class AsteroidCollision {
    public static int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> stack = new ArrayDeque<>(); // @step:initialize
        for (int asteroidIdx = 0; asteroidIdx < asteroids.length; asteroidIdx++) {
            int currentAsteroid = asteroids[asteroidIdx]; // @step:visit
            boolean alive = true; // @step:visit
            // Collision occurs when the current asteroid moves left and the stack top moves right
            while (alive && currentAsteroid < 0 && !stack.isEmpty() && stack.peek() > 0) {
                int stackTop = stack.peek(); // @step:compare
                if (stackTop < -currentAsteroid) {
                    // Stack top is smaller — it gets destroyed
                    stack.pop(); // @step:pop
                } else if (stackTop == -currentAsteroid) {
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
        // Build result array from stack (reversed since Deque is LIFO)
        int[] result = new int[stack.size()]; // @step:complete
        for (int resultIdx = result.length - 1; resultIdx >= 0; resultIdx--) {
            result[resultIdx] = stack.pop(); // @step:complete
        }
        return result; // @step:complete
    }
}
