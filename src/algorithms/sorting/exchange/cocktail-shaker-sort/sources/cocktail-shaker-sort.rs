// Cocktail Shaker Sort — bidirectional bubble sort sweeping left-to-right then right-to-left
fn cocktail_shaker_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    let mut left_bound = 0usize; // @step:initialize
    let mut right_bound = array_length.saturating_sub(1); // @step:initialize
    let mut swapped = true; // @step:initialize

    while swapped {
        swapped = false;

        // Forward pass: left to right — bubble largest unsorted element to right_bound
        // @step:forward-pass
        for forward_index in left_bound..right_bound {
            // @step:compare
            if sorted_array[forward_index] > sorted_array[forward_index + 1] {
                // @step:swap
                sorted_array.swap(forward_index, forward_index + 1); // @step:swap
                swapped = true; // @step:swap
            }
        }

        // The rightmost unsorted element is now sorted
        // @step:mark-sorted
        if right_bound == 0 {
            break;
        }
        right_bound -= 1;

        if !swapped {
            break;
        }
        swapped = false;

        // Backward pass: right to left — bubble smallest unsorted element to left_bound
        // @step:backward-pass
        for backward_index in (left_bound + 1..=right_bound).rev() {
            // @step:compare
            if sorted_array[backward_index - 1] > sorted_array[backward_index] {
                // @step:swap
                sorted_array.swap(backward_index, backward_index - 1); // @step:swap
                swapped = true; // @step:swap
            }
        }

        // The leftmost unsorted element is now sorted
        // @step:mark-sorted
        left_bound += 1;
    }

    sorted_array // @step:complete
}
