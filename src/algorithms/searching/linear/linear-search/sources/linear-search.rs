// Linear Search — scan left to right comparing each element with the target
fn linear_search(array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    for (current_index, &current_value) in array.iter().enumerate() {
        // @step:visit
        // @step:compare
        if current_value == target_value {
            // @step:compare,found
            return current_index as i32; // @step:found
        }
    }

    -1 // @step:complete
}
