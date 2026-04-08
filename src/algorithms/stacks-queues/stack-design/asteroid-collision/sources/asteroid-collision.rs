// Asteroid Collision — use a stack to simulate asteroid collisions, resolving each pair by size
fn asteroid_collision(asteroids: &[i32]) -> Vec<i32> {
    let mut stack: Vec<i32> = Vec::new(); // @step:initialize
    for asteroid_idx in 0..asteroids.len() {
        let current_asteroid = asteroids[asteroid_idx]; // @step:visit
        let mut alive = true; // @step:visit
        // Collision occurs when the current asteroid moves left and the stack top moves right
        while alive && current_asteroid < 0 && !stack.is_empty() && *stack.last().unwrap() > 0 {
            let stack_top = *stack.last().unwrap(); // @step:compare
            if stack_top < -current_asteroid {
                // Stack top is smaller — it gets destroyed
                stack.pop(); // @step:pop
            } else if stack_top == -current_asteroid {
                // Equal size — both are destroyed
                stack.pop(); // @step:match
                alive = false; // @step:match
            } else {
                // Stack top is larger — current asteroid is destroyed
                alive = false; // @step:mismatch
            }
        }
        if alive {
            stack.push(current_asteroid); // @step:push
        }
    }
    stack // @step:complete
}

fn main() {
    println!("{:?}", asteroid_collision(&[5, 10, -5]));
}
