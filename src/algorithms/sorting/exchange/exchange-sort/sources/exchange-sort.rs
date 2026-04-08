// Exchange Sort — for each element, compare with all subsequent elements and swap if out of order
fn exchange_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    for outer_index in 0..array_length.saturating_sub(1) {
        for inner_index in (outer_index + 1)..array_length {
            // @step:compare
            if sorted_array[outer_index] > sorted_array[inner_index] {
                // @step:swap
                sorted_array.swap(outer_index, inner_index); // @step:swap
            }
        }

        // The element at outer_index is now in its final sorted position
        // @step:mark-sorted
    }

    sorted_array // @step:complete
}
