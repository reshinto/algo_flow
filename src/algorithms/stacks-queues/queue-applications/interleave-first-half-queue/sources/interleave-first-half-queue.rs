// Interleave First Half Queue — interleave the first half of a queue with the second half using a stack
use std::collections::VecDeque;

fn interleave_first_half_queue(values: &[i32]) -> Vec<i32> {
    let mut queue: VecDeque<i32> = values.iter().copied().collect(); // @step:initialize
    let half_size = values.len() / 2; // @step:initialize
    let mut stack: Vec<i32> = Vec::new(); // @step:initialize

    // Step 1: Dequeue first half into stack
    for _ in 0..half_size {
        stack.push(queue.pop_front().unwrap()); // @step:push
    }

    // Step 2: Enqueue stack elements back to queue (reverses first half)
    while let Some(val) = stack.pop() {
        queue.push_back(val); // @step:enqueue
    }

    // Step 3: Dequeue second half and enqueue back (move original second half to rear)
    for _ in 0..half_size {
        let front = queue.pop_front().unwrap();
        queue.push_back(front); // @step:transfer
    }

    // Step 4: Dequeue first half (originally first half, now at front) into stack
    for _ in 0..half_size {
        stack.push(queue.pop_front().unwrap()); // @step:push
    }

    // Step 5: Interleave — alternately pop from stack and dequeue from queue
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    while let Some(val) = stack.pop() {
        result.push(val); // @step:pop
        result.push(queue.pop_front().unwrap()); // @step:dequeue
    }
    if let Some(val) = queue.pop_front() {
        result.push(val); // @step:dequeue
    }

    result // @step:complete
}

fn main() {
    println!("{:?}", interleave_first_half_queue(&[1, 2, 3, 4, 5, 6]));
}
