// Binary Insertion Sort — use binary search to find position, then shift and insert
fn binary_insertion_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    for outer_index in 1..array_length {
        let current_element = sorted_array[outer_index]; // @step:binary-search
        let mut search_left = 0usize; // @step:binary-search
        let mut search_right = outer_index; // @step:binary-search

        // Binary search for the correct insertion position
        while search_left < search_right {
            let mid_index = search_left + (search_right - search_left) / 2; // @step:compare
            if current_element < sorted_array[mid_index] {
                // @step:compare
                search_right = mid_index; // @step:compare
            } else {
                search_left = mid_index + 1; // @step:compare
            }
        }

        // Shift elements right to make room for current_element
        let mut shift_index = outer_index; // @step:swap
        while shift_index > search_left {
            // @step:swap
            sorted_array[shift_index] = sorted_array[shift_index - 1]; // @step:swap
            shift_index -= 1; // @step:swap
        }
        sorted_array[search_left] = current_element; // @step:swap

        // Element is now in its sorted position within the sorted prefix
        // @step:mark-sorted
    }

    sorted_array // @step:complete
}
