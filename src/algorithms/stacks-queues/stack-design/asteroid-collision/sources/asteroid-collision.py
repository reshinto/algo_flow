# Asteroid Collision — use a stack to simulate asteroid collisions, resolving each pair by size
def asteroid_collision(asteroids):
    stack = []  # @step:initialize
    for current_asteroid in asteroids:  # @step:visit
        alive = True  # @step:visit
        # Collision occurs when the current asteroid moves left and the stack top moves right
        while alive and current_asteroid < 0 and stack and stack[-1] > 0:
            stack_top = stack[-1]  # @step:compare
            if stack_top < -current_asteroid:
                # Stack top is smaller — it gets destroyed
                stack.pop()  # @step:pop
            elif stack_top == -current_asteroid:
                # Equal size — both are destroyed
                stack.pop()  # @step:match
                alive = False  # @step:match
            else:
                # Stack top is larger — current asteroid is destroyed
                alive = False  # @step:mismatch
        if alive:
            stack.append(current_asteroid)  # @step:push
    return stack  # @step:complete
