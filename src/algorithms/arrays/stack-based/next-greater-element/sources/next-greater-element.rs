// Next Greater Element — monotonic stack: for each element, find the next strictly greater element to its right
fn next_greater_element(input_array: &[i32]) -> Vec<i32> {
    let array_length = input_array.len();
    let mut result_array = vec![-1i32; array_length]; // @step:initialize
    let mut pending_stack: Vec<usize> = Vec::new(); // @step:initialize

    for scan_index in 0..array_length {
        let current_element = input_array[scan_index]; // @step:visit

        while !pending_stack.is_empty() {
            let stack_top = *pending_stack.last().unwrap(); // @step:compare
            if input_array[stack_top] < current_element {
                // @step:compare
                let popped_index = pending_stack.pop().unwrap(); // @step:compare
                result_array[popped_index] = current_element; // @step:compare
            } else {
                break;
            }
        }

        pending_stack.push(scan_index); // @step:visit
    }

    result_array // @step:complete
}
