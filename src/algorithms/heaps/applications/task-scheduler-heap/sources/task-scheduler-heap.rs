// Task Scheduler Heap — minimum intervals to complete all tasks with cooldown (LeetCode 621)
fn task_scheduler_heap(tasks: &[char], cooldown: usize) -> usize {
    use std::collections::HashMap;

    // Count task frequencies
    let mut frequency_map: HashMap<char, i64> = HashMap::new(); // @step:initialize
    for &task_name in tasks {
        *frequency_map.entry(task_name).or_insert(0) += 1; // @step:initialize
    }

    // Build max-heap of frequencies
    let mut heap: Vec<i64> = Vec::new(); // @step:initialize
    for frequency in frequency_map.values() {
        heap.push(*frequency); // @step:heap-insert
    }

    fn sift_up(arr: &mut Vec<i64>, mut current_idx: usize) {
        while current_idx > 0 {
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if arr[parent_idx] >= arr[current_idx] {
                break; // @step:compare
            }
            arr.swap(parent_idx, current_idx); // @step:heap-swap
            current_idx = parent_idx; // @step:sift-up
        }
    }

    fn sift_down(arr: &mut Vec<i64>, mut parent_idx: usize) {
        loop {
            let mut largest_idx = parent_idx; // @step:sift-down
            let left_idx = 2 * parent_idx + 1; // @step:sift-down
            let right_idx = 2 * parent_idx + 2; // @step:sift-down
            if left_idx < arr.len() && arr[left_idx] > arr[largest_idx] {
                // @step:compare
                largest_idx = left_idx; // @step:sift-down
            }
            if right_idx < arr.len() && arr[right_idx] > arr[largest_idx] {
                // @step:compare
                largest_idx = right_idx; // @step:sift-down
            }
            if largest_idx == parent_idx {
                break; // @step:sift-down
            }
            arr.swap(parent_idx, largest_idx); // @step:heap-swap
            parent_idx = largest_idx; // @step:sift-down
        }
    }

    // Heapify
    if heap.len() > 1 {
        for start_idx in (0..=(heap.len() / 2 - 1)).rev() {
            sift_down(&mut heap, start_idx); // @step:sift-down
        }
    }

    let mut total_intervals = 0usize; // @step:initialize

    while !heap.is_empty() {
        let cycle_size = cooldown + 1; // @step:initialize
        let mut round_tasks: Vec<i64> = Vec::new(); // @step:initialize

        // Extract up to cooldown+1 tasks this round
        let mut slot_index = 0;
        while slot_index < cycle_size && !heap.is_empty() {
            let max_frequency = heap[0]; // @step:heap-extract
            let last_idx = heap.len() - 1; // @step:heap-extract
            heap[0] = heap[last_idx]; // @step:heap-swap
            heap.pop(); // @step:heap-extract
            if !heap.is_empty() {
                sift_down(&mut heap, 0); // @step:sift-down
            }
            round_tasks.push(max_frequency - 1); // @step:compare
            slot_index += 1;
        }

        // Reinsert tasks with remaining frequency
        for &remaining_frequency in &round_tasks {
            if remaining_frequency > 0 {
                heap.push(remaining_frequency); // @step:heap-insert
                let last = heap.len() - 1;
                sift_up(&mut heap, last);
            }
        }

        // Add full cycle or just the tasks if this is the last round
        if !heap.is_empty() {
            total_intervals += cycle_size; // @step:compare
        } else {
            total_intervals += round_tasks.len(); // @step:compare
        }
    }

    total_intervals // @step:complete
}
