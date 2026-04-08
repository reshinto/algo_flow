// Last Stone Weight — repeatedly smash the two heaviest stones, return the last remaining weight
fn last_stone_weight(stones: &[i64]) -> i64 {
    let mut heap = stones.to_vec(); // @step:initialize
    let heap_size = heap.len();

    // Build max-heap using Floyd's algorithm
    if heap_size > 1 {
        for start_idx in (0..=(heap_size / 2 - 1)).rev() {
            // @step:sift-down
            let mut parent_idx = start_idx; // @step:sift-down
            loop {
                let mut largest_idx = parent_idx; // @step:sift-down
                let left_idx = 2 * parent_idx + 1; // @step:sift-down
                let right_idx = 2 * parent_idx + 2; // @step:sift-down
                if left_idx < heap.len() && heap[left_idx] > heap[largest_idx] {
                    // @step:compare
                    largest_idx = left_idx; // @step:sift-down
                }
                if right_idx < heap.len() && heap[right_idx] > heap[largest_idx] {
                    // @step:compare
                    largest_idx = right_idx; // @step:sift-down
                }
                if largest_idx == parent_idx {
                    break; // @step:sift-down
                }
                heap.swap(parent_idx, largest_idx); // @step:heap-swap
                parent_idx = largest_idx; // @step:sift-down
            }
        }
    }

    fn extract_max(arr: &mut Vec<i64>) -> i64 {
        let max_value = arr[0]; // @step:heap-extract
        let last_idx = arr.len() - 1; // @step:heap-extract
        arr[0] = arr[last_idx]; // @step:heap-swap
        arr.pop(); // @step:heap-extract
        let mut parent_idx = 0usize; // @step:sift-down
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
        max_value
    }

    fn insert_value(arr: &mut Vec<i64>, value: i64) {
        arr.push(value); // @step:heap-insert
        let mut current_idx = arr.len() - 1; // @step:sift-up
        while current_idx > 0 {
            let parent_idx = (current_idx - 1) / 2; // @step:sift-up
            if arr[parent_idx] >= arr[current_idx] {
                break; // @step:compare
            }
            arr.swap(parent_idx, current_idx); // @step:heap-swap
            current_idx = parent_idx; // @step:sift-up
        }
    }

    while heap.len() >= 2 {
        let heaviest = extract_max(&mut heap); // @step:heap-extract
        let second_heaviest = extract_max(&mut heap); // @step:heap-extract
        if heaviest != second_heaviest {
            // @step:compare
            insert_value(&mut heap, heaviest - second_heaviest); // @step:heap-insert
        }
    }

    if heap.is_empty() { 0 } else { heap[0] } // @step:complete
}
