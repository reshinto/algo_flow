// Heap Increase Key — increase the value at a given index in a min-heap, then sift-down
fn heap_increase_key(input_array: &[i64], target_index: usize, new_value: i64) -> Vec<i64> {
    let mut array = input_array.to_vec(); // @step:initialize

    // Update the value at target_index to the new (larger) value
    array[target_index] = new_value; // @step:heap-update

    // Sift down to restore the min-heap property
    let size = array.len();
    sift_down(&mut array, target_index, size); // @step:sift-down

    array // @step:complete
}

fn sift_down(array: &mut Vec<i64>, start_index: usize, size: usize) {
    let mut parent_index = start_index; // @step:sift-down
    loop {
        let mut smallest_index = parent_index; // @step:sift-down
        let left_index = 2 * parent_index + 1; // @step:sift-down
        let right_index = 2 * parent_index + 2; // @step:sift-down
        // Find the smallest among parent, left child, and right child
        if left_index < size && array[left_index] < array[smallest_index] {
            // @step:compare
            smallest_index = left_index; // @step:sift-down
        }
        if right_index < size && array[right_index] < array[smallest_index] {
            // @step:compare
            smallest_index = right_index; // @step:sift-down
        }
        if smallest_index == parent_index {
            break; // @step:sift-down
        }
        // Swap parent with smallest child — parent value is too large, push it down
        array.swap(parent_index, smallest_index); // @step:heap-swap
        parent_index = smallest_index; // @step:sift-down
    }
}
