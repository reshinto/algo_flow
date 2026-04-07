// Odd-Even Sort — alternates between comparing odd-indexed and even-indexed adjacent pairs
fn odd_even_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    let mut sorted = false; // @step:initialize

    while !sorted {
        sorted = true;

        // Odd phase: compare pairs at (1,2), (3,4), (5,6), ...
        // @step:odd-phase
        let mut odd_index = 1;
        while odd_index < array_length.saturating_sub(1) {
            // @step:compare
            if sorted_array[odd_index] > sorted_array[odd_index + 1] {
                // @step:swap
                sorted_array.swap(odd_index, odd_index + 1); // @step:swap
                sorted = false;
            }
            odd_index += 2;
        }

        // Even phase: compare pairs at (0,1), (2,3), (4,5), ...
        // @step:even-phase
        let mut even_index = 0;
        while even_index < array_length.saturating_sub(1) {
            // @step:compare
            if sorted_array[even_index] > sorted_array[even_index + 1] {
                // @step:swap
                sorted_array.swap(even_index, even_index + 1); // @step:swap
                sorted = false;
            }
            even_index += 2;
        }
    }

    // All elements are in their sorted positions
    // @step:mark-sorted

    sorted_array // @step:complete
}
