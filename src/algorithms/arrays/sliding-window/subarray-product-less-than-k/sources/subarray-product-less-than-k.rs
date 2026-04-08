// Subarray Product < K — O(n) variable sliding window counting subarrays with product below threshold
fn subarray_product_less_than_k(input_array: &[i32], threshold: i32) -> usize {
    if input_array.is_empty() || threshold <= 1 {
        // @step:initialize
        return 0; // @step:initialize
    }

    let mut left_pointer = 0usize; // @step:initialize
    let mut current_product = 1i32;
    let mut count = 0usize;

    // Expand the right boundary of the window
    for right_pointer in 0..input_array.len() {
        current_product *= input_array[right_pointer]; // @step:expand-window

        // Shrink from the left while product meets or exceeds threshold
        while current_product >= threshold && left_pointer <= right_pointer {
            // @step:compare
            current_product /= input_array[left_pointer]; // @step:shrink-window
            left_pointer += 1; // @step:shrink-window
        }

        // Every subarray ending at right_pointer and starting anywhere in [left_pointer, right_pointer]
        if left_pointer <= right_pointer {
            count += right_pointer - left_pointer + 1; // @step:compare
        }
    }

    count // @step:complete
}
