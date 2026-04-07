// Four Sum — finds all unique quadruplets summing to target via sorting and two-pointer reduction
fn four_sum(input_array: &[i32], target: i64) -> Vec<[i32; 4]> {
    let mut sorted_array = input_array.to_vec();
    sorted_array.sort(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    let mut quadruplets: Vec<[i32; 4]> = Vec::new(); // @step:initialize

    let mut first_index = 0usize;
    while first_index < array_length.saturating_sub(3) { // @step:visit
        if first_index > 0 && sorted_array[first_index] == sorted_array[first_index - 1] {
            // @step:compare
            first_index += 1;
            continue; // @step:compare
        }

        let mut second_index = first_index + 1;
        while second_index < array_length.saturating_sub(2) { // @step:visit
            if second_index > first_index + 1 && sorted_array[second_index] == sorted_array[second_index - 1] {
                // @step:compare
                second_index += 1;
                continue; // @step:compare
            }

            let mut left_pointer = second_index + 1; // @step:visit
            let mut right_pointer = array_length - 1; // @step:visit

            while left_pointer < right_pointer { // @step:compare
                let current_sum = sorted_array[first_index] as i64
                    + sorted_array[second_index] as i64
                    + sorted_array[left_pointer] as i64
                    + sorted_array[right_pointer] as i64; // @step:compare

                if current_sum == target {
                    // @step:compare
                    quadruplets.push([
                        sorted_array[first_index],
                        sorted_array[second_index],
                        sorted_array[left_pointer],
                        sorted_array[right_pointer],
                    ]); // @step:visit

                    while left_pointer < right_pointer && sorted_array[left_pointer] == sorted_array[left_pointer + 1] {
                        left_pointer += 1; // @step:compare
                    }
                    while left_pointer < right_pointer && sorted_array[right_pointer] == sorted_array[right_pointer - 1] {
                        right_pointer -= 1; // @step:compare
                    }
                    left_pointer += 1; // @step:visit
                    right_pointer -= 1; // @step:visit
                } else if current_sum < target {
                    left_pointer += 1; // @step:visit
                } else {
                    right_pointer -= 1; // @step:visit
                }
            }
            second_index += 1;
        }
        first_index += 1;
    }

    quadruplets // @step:complete
}
