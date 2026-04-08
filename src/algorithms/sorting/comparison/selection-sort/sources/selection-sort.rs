// Selection Sort — find minimum in unsorted portion and swap to front
fn selection_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    for outer_index in 0..array_length.saturating_sub(1) {
        // @step:outer-loop
        let mut minimum_index = outer_index; // @step:outer-loop

        // Scan the unsorted portion for the minimum element
        for inner_index in (outer_index + 1)..array_length {
            // @step:compare
            if sorted_array[inner_index] < sorted_array[minimum_index] {
                // @step:compare
                minimum_index = inner_index; // @step:compare
            }
        }

        // Swap the minimum into position if it is not already there
        if minimum_index != outer_index {
            // @step:swap
            sorted_array.swap(outer_index, minimum_index); // @step:swap
        }

        // The element at outer_index is now permanently in its sorted position
        // @step:mark-sorted
    }

    sorted_array // @step:complete
}
