// Implement Stack Using Queues — use one queue to emulate LIFO stack behaviour (LeetCode 225)
use std::collections::VecDeque;

fn implement_stack_using_queues(values: &[i32]) -> Vec<i32> {
    let mut queue: VecDeque<i32> = VecDeque::new(); // @step:initialize
    let mut pop_results: Vec<i32> = Vec::new(); // @step:initialize

    // Push phase — enqueue each value, then rotate all prior elements behind it
    for element_idx in 0..values.len() {
        let current_value = values[element_idx]; // @step:visit
        queue.push_back(current_value); // @step:enqueue
        // Rotate: move every element that was there before the new one to the back
        for _ in 0..(queue.len() - 1) {
            let transferred = queue.pop_front().unwrap(); // @step:transfer
            queue.push_back(transferred); // @step:transfer
        }
    }

    // Pop phase — front of queue is always the most-recently pushed element (LIFO)
    while let Some(popped_value) = queue.pop_front() {
        pop_results.push(popped_value); // @step:dequeue
    }

    pop_results // @step:complete
}

fn main() {
    println!("{:?}", implement_stack_using_queues(&[1, 2, 3, 4]));
}
