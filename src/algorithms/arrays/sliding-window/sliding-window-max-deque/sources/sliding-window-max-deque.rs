// Sliding Window Maximum (Deque) — O(n) monotonic decreasing deque
use std::collections::VecDeque;

fn sliding_window_max_deque(input_array: &[i32], window_size: usize) -> Vec<i32> {
    let array_length = input_array.len();
    if array_length == 0 || window_size == 0 || window_size > array_length {
        // @step:initialize
        return vec![]; // @step:initialize
    }

    let mut result: Vec<i32> = Vec::new(); // @step:initialize
    let mut deque: VecDeque<usize> = VecDeque::new(); // @step:initialize — stores indices, front = max of current window

    for current_index in 0..array_length {
        // Remove indices outside the current window from the front
        while !deque.is_empty() && *deque.front().unwrap() + window_size <= current_index {
            // @step:compare
            deque.pop_front(); // @step:visit
        }

        // Remove indices of elements smaller than the current element from the back
        while !deque.is_empty() && input_array[*deque.back().unwrap()] < input_array[current_index] {
            // @step:compare
            deque.pop_back(); // @step:visit
        }

        deque.push_back(current_index); // @step:visit

        // The window is fully formed once current_index >= window_size - 1
        if current_index >= window_size - 1 {
            // @step:compare
            result.push(input_array[*deque.front().unwrap()]); // @step:visit
        }
    }

    result // @step:complete
}
