// Three Sum — O(n^2) find all unique triplets that sum to zero using sort + two-pointer
fn three_sum(input_array: &[i32]) -> Vec<[i32; 3]> {
    let mut sorted_array = input_array.to_vec();
    sorted_array.sort(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    let mut triplets: Vec<[i32; 3]> = Vec::new(); // @step:initialize

    let mut anchor_index = 0usize;
    while anchor_index < array_length.saturating_sub(2) { // @step:visit
        // Skip duplicate anchor values to avoid duplicate triplets
        if anchor_index > 0 && sorted_array[anchor_index] == sorted_array[anchor_index - 1] {
            // @step:compare
            anchor_index += 1;
            continue; // @step:compare
        }

        let mut left_pointer = anchor_index + 1; // @step:visit
        let mut right_pointer = array_length - 1; // @step:visit

        while left_pointer < right_pointer { // @step:compare
            let current_sum = sorted_array[anchor_index] + sorted_array[left_pointer] + sorted_array[right_pointer]; // @step:compare

            if current_sum == 0 {
                // @step:compare
                triplets.push([sorted_array[anchor_index], sorted_array[left_pointer], sorted_array[right_pointer]]); // @step:visit

                // Advance both pointers and skip duplicates
                while left_pointer < right_pointer && sorted_array[left_pointer] == sorted_array[left_pointer + 1] {
                    left_pointer += 1; // @step:compare
                }
                while left_pointer < right_pointer && sorted_array[right_pointer] == sorted_array[right_pointer - 1] {
                    right_pointer -= 1; // @step:compare
                }
                left_pointer += 1; // @step:visit
                right_pointer -= 1; // @step:visit
            } else if current_sum < 0 {
                left_pointer += 1; // @step:visit
            } else {
                right_pointer -= 1; // @step:visit
            }
        }
        anchor_index += 1;
    }

    triplets // @step:complete
}
