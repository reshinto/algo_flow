// Number of Recent Calls — count calls in a 3000ms sliding window using a queue (LeetCode 933)
use std::collections::VecDeque;

fn number_of_recent_calls(timestamps: &[i32]) -> Vec<i32> {
    let mut queue: VecDeque<i32> = VecDeque::new(); // @step:initialize
    let mut results: Vec<i32> = Vec::new(); // @step:initialize

    for timestamp_idx in 0..timestamps.len() {
        let current_timestamp = timestamps[timestamp_idx]; // @step:visit

        queue.push_back(current_timestamp); // @step:enqueue

        // Remove timestamps outside the 3000ms window
        while let Some(&front) = queue.front() {
            if front < current_timestamp - 3000 { // @step:dequeue
                queue.pop_front(); // @step:dequeue
            } else {
                break;
            }
        }

        results.push(queue.len() as i32); // @step:complete
    }

    results // @step:complete
}

fn main() {
    let timestamps = vec![1, 100, 3001, 3002];
    println!("{:?}", number_of_recent_calls(&timestamps));
}
