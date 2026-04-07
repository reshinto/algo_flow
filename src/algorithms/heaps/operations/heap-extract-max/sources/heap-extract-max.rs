// Heap Extract Max — remove and return the maximum (root) from a max-heap, then restore heap property
fn heap_extract_max(heap_array: &[i64]) -> (i64, Vec<i64>) {
    let mut array = heap_array.to_vec(); // @step:initialize
    let extracted_value = array[0]; // @step:heap-extract
    let last_idx = array.len() - 1; // @step:heap-extract
    // Move last element to root and remove the last position
    array.swap(0, last_idx); // @step:heap-swap
    array.pop(); // @step:heap-extract
    // Sift down the new root to restore max-heap property
    let size = array.len();
    let mut parent_idx = 0usize; // @step:sift-down
    loop {
        // @step:sift-down
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
        // Swap parent with largest child
        array.swap(parent_idx, largest_idx); // @step:heap-swap
        parent_idx = largest_idx; // @step:sift-down
    }
    (extracted_value, array) // @step:complete
}
