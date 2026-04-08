// Heap Decrease Key — decrease the value at a given index in a min-heap, then sift-up
fn heap_decrease_key(input_array: &[i64], target_index: usize, new_value: i64) -> Vec<i64> {
    let mut array = input_array.to_vec(); // @step:initialize

    // Update the value at target_index to the new (smaller) value
    array[target_index] = new_value; // @step:heap-update

    // Sift up to restore the min-heap property
    sift_up(&mut array, target_index); // @step:sift-up

    array // @step:complete
}

fn sift_up(array: &mut Vec<i64>, start_index: usize) {
    let mut current_index = start_index; // @step:sift-up
    while current_index > 0 {
        let parent_index = (current_index - 1) / 2; // @step:sift-up
        if array[current_index] >= array[parent_index] {
            break; // @step:compare
        }
        // Swap current with parent — current value is smaller, move it up
        array.swap(current_index, parent_index); // @step:heap-swap
        current_index = parent_index; // @step:sift-up
    }
}
