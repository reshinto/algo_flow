// Heap Insert — append a value to a min-heap and restore heap property via sift-up
fn heap_insert(heap_array: &[i64], value: i64) -> Vec<i64> {
    let mut array = heap_array.to_vec(); // @step:initialize
    array.push(value); // @step:heap-insert
    let mut current_idx = array.len() - 1; // @step:heap-insert
    // Sift up: while not at root, compare with parent and swap if smaller
    while current_idx > 0 {
        // @step:sift-up
        let parent_idx = (current_idx - 1) / 2; // @step:sift-up
        if array[current_idx] >= array[parent_idx] {
            break; // @step:sift-up
        }
        // Swap with parent to restore heap property
        array.swap(current_idx, parent_idx); // @step:heap-swap
        current_idx = parent_idx; // @step:sift-up
    }
    array // @step:complete
}
