// Shell Sort — generalized insertion sort with decreasing gap sequence
fn shell_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    // Start with half the array length and halve the gap each pass
    let mut gap_size = array_length / 2;
    while gap_size > 0 {
        // @step:gap-update

        // Perform a gapped insertion sort for this gap size
        for outer_index in gap_size..array_length {
            // @step:compare
            let current_value = sorted_array[outer_index]; // @step:compare
            let mut inner_index = outer_index; // @step:compare

            // Shift elements that are larger than current_value by gap_size positions
            while inner_index >= gap_size && sorted_array[inner_index - gap_size] > current_value {
                // @step:compare
                sorted_array[inner_index] = sorted_array[inner_index - gap_size]; // @step:swap
                inner_index -= gap_size; // @step:swap
            }

            // Place current_value in its gap-relative sorted position
            sorted_array[inner_index] = current_value; // @step:swap
        }

        // When gap reduces to 1 the final pass is a standard insertion sort
        // @step:mark-sorted
        gap_size /= 2;
    }

    sorted_array // @step:complete
}
