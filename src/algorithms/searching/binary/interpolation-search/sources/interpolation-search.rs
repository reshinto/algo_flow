// Interpolation Search — estimate position using value distribution, not just midpoint
fn interpolation_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    if sorted_array.is_empty() { return -1; } // @step:initialize
    let mut low_index = 0usize; // @step:initialize
    let mut high_index = sorted_array.len().saturating_sub(1); // @step:initialize

    while low_index <= high_index
        && target_value >= sorted_array[low_index]
        && target_value <= sorted_array[high_index]
    {
        let low_value = sorted_array[low_index]; // @step:compare
        let high_value = sorted_array[high_index]; // @step:compare

        // Guard against division by zero when all elements in range are equal
        if high_value == low_value {
            // @step:compare
            if low_value == target_value {
                return low_index as i32; // @step:found
            }
            break; // @step:complete
        }

        // Interpolation formula — estimate position based on value distribution
        let position_index = low_index as i32
            + ((target_value - low_value) * (high_index as i32 - low_index as i32))
                / (high_value - low_value); // @step:compare
        let position_index = position_index as usize;
        let position_value = sorted_array[position_index]; // @step:compare

        if position_value == target_value {
            // @step:compare,found
            return position_index as i32; // @step:found
        } else if position_value < target_value {
            // @step:eliminate
            low_index = position_index + 1; // @step:eliminate
        } else {
            // @step:eliminate
            if position_index == 0 {
                break;
            }
            high_index = position_index - 1; // @step:eliminate
        }
    }

    -1 // @step:complete
}
