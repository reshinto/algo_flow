// Two Sum (Sorted Array) — O(n) two-pointer: converge from both ends toward the target sum
fn two_pointer_sum(sorted_array: &[i32], target: i32) -> (bool, i64, i64) {
    let mut left_pointer = 0usize; // @step:initialize
    let mut right_pointer = sorted_array.len() - 1; // @step:initialize

    while left_pointer < right_pointer {
        let current_sum = sorted_array[left_pointer] + sorted_array[right_pointer]; // @step:visit

        if current_sum == target {
            // @step:compare
            return (true, left_pointer as i64, right_pointer as i64); // @step:complete
        } else if current_sum < target {
            // @step:compare
            left_pointer += 1; // @step:visit
        } else {
            right_pointer -= 1; // @step:visit
        }
    }

    (false, -1, -1) // @step:complete
}
