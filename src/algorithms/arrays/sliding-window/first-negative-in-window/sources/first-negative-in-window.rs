// First Negative in Window — O(n) using a deque to track negative indices
use std::collections::VecDeque;

fn first_negative_in_window(input_array: &[i32], window_size: usize) -> Vec<i32> {
    let array_length = input_array.len();

    if array_length == 0 || window_size == 0 || window_size > array_length {
        // @step:initialize
        return vec![]; // @step:initialize
    }

    // Deque stores indices of negative numbers in current window
    let mut negative_indices: VecDeque<usize> = VecDeque::new(); // @step:initialize
    let mut result: Vec<i32> = Vec::new();

    // Process first window
    for init_index in 0..window_size {
        // @step:move-window
        if input_array[init_index] < 0 {
            // @step:move-window
            negative_indices.push_back(init_index); // @step:move-window
        }
    }

    // Record result for first window
    result.push(if !negative_indices.is_empty() { input_array[*negative_indices.front().unwrap()] } else { 0 }); // @step:compare

    // Slide window across remaining positions
    for right_index in window_size..array_length {
        let left_index = right_index - window_size;

        // Remove indices that are out of current window
        if !negative_indices.is_empty() && *negative_indices.front().unwrap() <= left_index {
            // @step:shrink-window
            negative_indices.pop_front(); // @step:shrink-window
        }

        // Add new element if negative
        if input_array[right_index] < 0 {
            // @step:expand-window
            negative_indices.push_back(right_index); // @step:expand-window
        }

        // Record first negative in current window (or 0 if none)
        result.push(if !negative_indices.is_empty() { input_array[*negative_indices.front().unwrap()] } else { 0 }); // @step:compare
    }

    result // @step:complete
}
