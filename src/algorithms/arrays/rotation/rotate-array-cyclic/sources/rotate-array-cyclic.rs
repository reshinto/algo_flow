// Rotate Array (Cyclic Replacement) — O(n) time, O(1) space via cycle-following
fn rotate_array_cyclic(input_array: &[i32], rotate_count: usize) -> Vec<i32> {
    let mut result = input_array.to_vec();
    let array_length = result.len();

    if array_length == 0 {
        return result; // @step:initialize
    }

    let effective_rotation = rotate_count % array_length; // @step:initialize

    if effective_rotation == 0 {
        return result; // @step:initialize
    }

    let mut cycles_completed = 0usize; // @step:initialize
    let mut start_index = 0usize; // @step:initialize

    // Follow each cycle: place every element at its rotated destination
    while cycles_completed < array_length {
        let mut current_index = start_index; // @step:visit
        let mut carry_value = result[current_index]; // @step:visit

        // Traverse the cycle until returning to the start index
        loop {
            let destination_index = (current_index + effective_rotation) % array_length; // @step:compare
            let next_carry = result[destination_index]; // @step:compare
            result[destination_index] = carry_value; // @step:swap
            carry_value = next_carry; // @step:swap
            cycles_completed += 1; // @step:swap
            current_index = destination_index; // @step:swap
            if current_index == start_index { break; } // @step:compare
        }

        start_index += 1; // @step:visit
    }

    result // @step:complete
}
