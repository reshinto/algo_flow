// Bubble Sort — repeatedly swap adjacent out-of-order elements
fn bubble_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    for outer_index in 0..array_length.saturating_sub(1) {
        // @step:outer-loop,mark-sorted
        let mut swapped_this_pass = false; // @step:outer-loop

        // Each pass bubbles the next-largest element into its final position
        for inner_index in 0..array_length.saturating_sub(1).saturating_sub(outer_index) {
            // @step:inner-loop
            if sorted_array[inner_index] > sorted_array[inner_index + 1] {
                // @step:compare
                sorted_array.swap(inner_index, inner_index + 1); // @step:swap
                swapped_this_pass = true; // @step:swap
            }
        }

        // No swaps means the array is already sorted — exit early for O(n) best case
        if !swapped_this_pass {
            break; // @step:early-exit
        }
    }

    sorted_array // @step:complete
}
