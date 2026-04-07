// Merge K Sorted Arrays — merge k sorted arrays into one sorted array using a min-heap
fn merge_k_sorted_arrays(arrays: &[Vec<i64>]) -> Vec<i64> {
    let mut result: Vec<i64> = Vec::new(); // @step:initialize
    // Min-heap entries: (value, array_index, element_index)
    let mut heap: Vec<(i64, usize, usize)> = Vec::new(); // @step:initialize

    // Insert first element of each array into the heap
    for (array_index, arr) in arrays.iter().enumerate() {
        // @step:initialize
        if let Some(&first_element) = arr.first() {
            // @step:initialize
            heap.push((first_element, array_index, 0)); // @step:heap-insert
        }
    }

    // Build initial min-heap using sift-up for each inserted element
    for inserted_idx in 1..heap.len() {
        // @step:sift-up
        let mut child_idx = inserted_idx; // @step:sift-up
        while child_idx > 0 {
            // @step:sift-up
            let parent_idx = (child_idx - 1) / 2; // @step:sift-up
            if heap[parent_idx].0 <= heap[child_idx].0 {
                break; // @step:compare
            }
            heap.swap(parent_idx, child_idx); // @step:heap-swap
            child_idx = parent_idx; // @step:sift-up
        }
    }

    // Extract min and insert next element from the same array
    while !heap.is_empty() {
        let (min_value, array_index, element_index) = heap[0]; // @step:heap-extract
        result.push(min_value); // @step:heap-extract

        let next_element_index = element_index + 1; // @step:heap-extract
        let next_value = arrays[array_index].get(next_element_index).copied(); // @step:heap-extract

        if let Some(next_val) = next_value {
            // Replace root with next element from the same array
            heap[0] = (next_val, array_index, next_element_index); // @step:heap-insert
        } else {
            // No more elements in this array — remove root by moving last to root
            if let Some(last_entry) = heap.pop() {
                if !heap.is_empty() {
                    heap[0] = last_entry; // @step:heap-extract
                }
            }
        }

        // Sift down the root to restore heap property
        if heap.len() > 1 {
            let mut parent_idx = 0usize; // @step:sift-down
            loop {
                // @step:sift-down
                let mut smallest_idx = parent_idx; // @step:sift-down
                let left_idx = 2 * parent_idx + 1; // @step:sift-down
                let right_idx = 2 * parent_idx + 2; // @step:sift-down
                if left_idx < heap.len() && heap[left_idx].0 < heap[smallest_idx].0 {
                    // @step:compare
                    smallest_idx = left_idx; // @step:sift-down
                }
                if right_idx < heap.len() && heap[right_idx].0 < heap[smallest_idx].0 {
                    // @step:compare
                    smallest_idx = right_idx; // @step:sift-down
                }
                if smallest_idx == parent_idx {
                    break; // @step:sift-down
                }
                heap.swap(parent_idx, smallest_idx); // @step:heap-swap
                parent_idx = smallest_idx; // @step:sift-down
            }
        }
    }

    result // @step:complete
}
