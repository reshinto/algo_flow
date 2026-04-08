// Pancake Sort — find max in unsorted portion, flip to front, flip to end
// A flip reverses the subarray from index 0 to flip_index (inclusive) via adjacent swaps
fn pancake_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    let mut unsorted_size = array_length;
    while unsorted_size > 1 {
        // Find the index of the maximum element in the unsorted portion
        // @step:find-max
        let mut max_index = 0; // @step:find-max
        for search_index in 1..unsorted_size {
            // @step:compare
            if sorted_array[search_index] > sorted_array[max_index] {
                max_index = search_index; // @step:compare
            }
        }

        // If the max is not already at the end, flip it there
        if max_index != unsorted_size - 1 {
            // Flip max to front if not already there
            if max_index != 0 {
                // @step:flip
                let mut flip_left = 0; // @step:flip
                let mut flip_right = max_index; // @step:flip
                while flip_left < flip_right {
                    // @step:swap
                    sorted_array.swap(flip_left, flip_right); // @step:swap
                    flip_left += 1;
                    flip_right -= 1;
                }
            }

            // Flip front to end of unsorted portion
            // @step:flip
            let mut flip_left = 0; // @step:flip
            let mut flip_right = unsorted_size - 1; // @step:flip
            while flip_left < flip_right {
                // @step:swap
                sorted_array.swap(flip_left, flip_right); // @step:swap
                flip_left += 1;
                flip_right -= 1;
            }
        }

        // The element at unsorted_size - 1 is now in its sorted position
        // @step:mark-sorted
        unsorted_size -= 1;
    }

    sorted_array // @step:complete
}
