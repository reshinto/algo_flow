// Build Max Heap — convert an arbitrary array into a valid max-heap in-place using sift-down
fn build_max_heap(input_array: &[i64]) -> Vec<i64> {
    let mut array = input_array.to_vec(); // @step:initialize
    let size = array.len(); // @step:initialize
    // Start from last non-leaf node and sift down each node toward root
    if size > 1 {
        for start_idx in (0..=(size / 2 - 1)).rev() {
            // @step:sift-down
            sift_down(&mut array, start_idx, size); // @step:sift-down
        }
    }
    array // @step:complete
}

fn sift_down(array: &mut Vec<i64>, start_idx: usize, size: usize) {
    let mut parent_idx = start_idx; // @step:sift-down
    loop {
        let mut largest_idx = parent_idx; // @step:sift-down
        let left_idx = 2 * parent_idx + 1; // @step:sift-down
        let right_idx = 2 * parent_idx + 2; // @step:sift-down
        // Find the largest among parent, left child, and right child
        if left_idx < size && array[left_idx] > array[largest_idx] {
            // @step:sift-down
            largest_idx = left_idx; // @step:sift-down
        }
        if right_idx < size && array[right_idx] > array[largest_idx] {
            // @step:sift-down
            largest_idx = right_idx; // @step:sift-down
        }
        if largest_idx == parent_idx {
            break; // @step:sift-down
        }
        // Swap parent with the largest child
        array.swap(parent_idx, largest_idx); // @step:heap-swap
        parent_idx = largest_idx; // @step:sift-down
    }
}
