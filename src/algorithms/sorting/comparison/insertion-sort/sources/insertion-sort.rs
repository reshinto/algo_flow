// Insertion Sort — insert each element into the correct position within the sorted prefix
fn insertion_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    for outer_index in 1..array_length {
        // @step:outer-loop
        let current_value = sorted_array[outer_index]; // @step:outer-loop
        let mut inner_index = outer_index as isize - 1; // @step:outer-loop

        // Shift elements that are greater than current_value one position to the right
        while inner_index >= 0 && sorted_array[inner_index as usize] > current_value {
            // @step:compare
            sorted_array[(inner_index + 1) as usize] = sorted_array[inner_index as usize]; // @step:swap
            inner_index -= 1; // @step:swap
        }

        // Place current_value in its correct sorted position
        sorted_array[(inner_index + 1) as usize] = current_value; // @step:mark-sorted
    }

    sorted_array // @step:complete
}
