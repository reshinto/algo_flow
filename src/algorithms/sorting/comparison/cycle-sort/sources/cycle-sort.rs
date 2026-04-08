// Cycle Sort — for each element, count elements smaller than it to find its correct position;
// place it there. Minimizes the number of writes to the array.
fn cycle_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    for cycle_start in 0..array_length.saturating_sub(1) {
        // @step:count-position
        let mut current_value = sorted_array[cycle_start]; // @step:count-position

        // Find the correct position for current_value
        let mut correct_position = cycle_start; // @step:count-position
        for scan_index in (cycle_start + 1)..array_length {
            // @step:compare
            if sorted_array[scan_index] < current_value {
                // @step:compare
                correct_position += 1; // @step:count-position
            }
        }

        // If the item is already in the correct position, skip this cycle
        if correct_position == cycle_start {
            continue; // @step:count-position
        }

        // Skip over duplicates to find the unique insertion point
        while current_value == sorted_array[correct_position] {
            // @step:count-position
            correct_position += 1; // @step:count-position
        }

        // Place current_value at its correct position
        let displaced_value = sorted_array[correct_position]; // @step:swap
        sorted_array[correct_position] = current_value; // @step:swap
        current_value = displaced_value; // @step:swap

        // Rotate the rest of the cycle
        while correct_position != cycle_start {
            // @step:count-position
            correct_position = cycle_start; // @step:count-position

            for scan_index in (cycle_start + 1)..array_length {
                // @step:compare
                if sorted_array[scan_index] < current_value {
                    // @step:compare
                    correct_position += 1; // @step:count-position
                }
            }

            while current_value == sorted_array[correct_position] {
                // @step:count-position
                correct_position += 1; // @step:count-position
            }

            if current_value != sorted_array[correct_position] {
                // @step:swap
                let next_displaced_value = sorted_array[correct_position]; // @step:swap
                sorted_array[correct_position] = current_value; // @step:swap
                current_value = next_displaced_value; // @step:swap
            }
        }

        // @step:mark-sorted
    }

    // @step:mark-sorted
    sorted_array // @step:complete
}
