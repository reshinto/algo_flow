// Product of Array Except Self — O(n) two-pass prefix/suffix product (no division)
fn product_except_self(input_array: &[i32]) -> Vec<i32> {
    let array_length = input_array.len(); // @step:initialize
    if array_length == 0 {
        // @step:initialize
        return vec![]; // @step:initialize
    }

    let mut result_array = vec![1i32; array_length]; // @step:initialize

    // Left pass: result_array[index] = product of all elements to the left
    let mut prefix_product = 1i32; // @step:visit
    for scan_index in 0..array_length {
        // @step:visit
        result_array[scan_index] = prefix_product; // @step:visit
        prefix_product *= input_array[scan_index]; // @step:visit
    }

    // Right pass: multiply each position by the product of all elements to the right
    let mut suffix_product = 1i32; // @step:visit
    for scan_index in (0..array_length).rev() {
        // @step:visit
        result_array[scan_index] *= suffix_product; // @step:visit
        suffix_product *= input_array[scan_index]; // @step:visit
    }

    result_array // @step:complete
}
