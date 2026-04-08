// Previous Smaller Element — monotonic stack: for each element, find the nearest element to the LEFT that is strictly smaller, or -1
fn previous_smaller_element(input_array: &[i32]) -> Vec<i32> {
    let array_length = input_array.len();
    let mut result_array = vec![-1i32; array_length]; // @step:initialize
    let mut increasing_stack: Vec<usize> = Vec::new(); // @step:initialize

    for scan_index in 0..array_length {
        let current_element = input_array[scan_index]; // @step:visit

        // Pop elements from the stack that are >= current_element (they cannot be the answer)
        while !increasing_stack.is_empty() {
            let stack_top = *increasing_stack.last().unwrap(); // @step:compare
            if input_array[stack_top] >= current_element {
                // @step:compare
                increasing_stack.pop(); // @step:compare
            } else {
                break;
            }
        }

        // The new stack top (if any) is the nearest smaller element to the left
        if !increasing_stack.is_empty() {
            let nearest_smaller_index = *increasing_stack.last().unwrap(); // @step:visit
            result_array[scan_index] = input_array[nearest_smaller_index]; // @step:visit
        }

        increasing_stack.push(scan_index); // @step:visit
    }

    result_array // @step:complete
}
