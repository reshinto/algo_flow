// Sentinel Linear Search — eliminates the bounds check by placing the target at the end
fn sentinel_linear_search(array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    let array_length = array.len(); // @step:initialize
    if array_length == 0 {
        return -1; // @step:initialize
    }

    let mut work_array = array.to_vec();
    let last_element = work_array[array_length - 1]; // @step:initialize
    work_array[array_length - 1] = target_value; // @step:initialize — place sentinel

    let mut current_index = 0usize; // @step:initialize

    while work_array[current_index] != target_value {
        // @step:visit
        current_index += 1; // @step:visit
    }

    work_array[array_length - 1] = last_element; // @step:compare — restore last element

    if current_index < array_length - 1 || last_element == target_value {
        // @step:compare,found
        return current_index as i32; // @step:found
    }

    -1 // @step:complete
}
