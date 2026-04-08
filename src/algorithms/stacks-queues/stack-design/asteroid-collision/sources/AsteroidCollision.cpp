// Asteroid Collision — use a stack to simulate asteroid collisions, resolving each pair by size
#include <iostream>
#include <stack>
#include <vector>

std::vector<int> asteroidCollision(const std::vector<int>& asteroids) {
    std::stack<int> stack; // @step:initialize
    for (std::size_t asteroidIdx = 0; asteroidIdx < asteroids.size(); asteroidIdx++) {
        int currentAsteroid = asteroids[asteroidIdx]; // @step:visit
        bool alive = true; // @step:visit
        // Collision occurs when the current asteroid moves left and the stack top moves right
        while (alive && currentAsteroid < 0 && !stack.empty() && stack.top() > 0) {
            int stackTop = stack.top(); // @step:compare
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
    std::vector<int> result;
    while (!stack.empty()) {
        result.insert(result.begin(), stack.top());
        stack.pop();
    }
    return result; // @step:complete
}

#ifndef TESTING
int main() {
    auto result = asteroidCollision({5, 10, -5});
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
#endif
