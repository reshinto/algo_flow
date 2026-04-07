// Boyer-Moore Voting Algorithm — O(n) majority element via candidate cancellation
fn boyer_moore_voting(input_array: &[i32]) -> (i64, i32) {
    if input_array.is_empty() {
        // @step:initialize
        return (-1, 0); // @step:initialize
    }

    let mut candidate = input_array[0]; // @step:initialize
    let mut vote_count = 0i32; // @step:initialize

    // Phase 1: Find candidate using cancellation
    for element_index in 0..input_array.len() {
        let current_element = input_array[element_index]; // @step:visit

        if vote_count == 0 {
            // @step:compare
            candidate = current_element; // @step:compare
            vote_count = 1; // @step:compare
        } else if current_element == candidate {
            vote_count += 1; // @step:visit
        } else {
            vote_count -= 1; // @step:visit
        }
    }

    (candidate as i64, vote_count) // @step:complete
}
