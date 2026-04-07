// Sliding Window Maximum — find the max in each window of size k using a monotonic deque of indices
use std::collections::VecDeque;

fn sliding_window_max_monotonic(nums: &[i32], window_size: usize) -> Vec<i32> {
    let mut deque: VecDeque<usize> = VecDeque::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    for element_idx in 0..nums.len() {
        // @step:visit
        // Remove indices that have fallen outside the current window
        while let Some(&front) = deque.front() {
            if front + window_size <= element_idx { // @step:dequeue
                deque.pop_front(); // @step:dequeue
            } else {
                break;
            }
        }
        // Maintain monotonic decreasing order — remove smaller elements from the rear
        while let Some(&back) = deque.back() {
            if nums[back] <= nums[element_idx] { // @step:maintain-monotonic
                deque.pop_back(); // @step:maintain-monotonic
            } else {
                break;
            }
        }
        deque.push_back(element_idx); // @step:enqueue
        // Once the first full window is reached, record the maximum (front of deque)
        if element_idx >= window_size - 1 { // @step:peek
            result.push(nums[*deque.front().unwrap()]); // @step:peek
        }
    }
    result // @step:complete
}

fn main() {
    let nums = vec![1, 3, -1, -3, 5, 3, 6, 7];
    println!("{:?}", sliding_window_max_monotonic(&nums, 3));
}
