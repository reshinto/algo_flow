// Find Missing Number — XOR approach: XOR all elements with expected range 0..n, pair cancellations leave the missing number
fn find_missing_number(input_array: &[i32]) -> i32 {
    let array_length = input_array.len() as i32; // @step:initialize
    let mut current_xor = 0i32; // @step:initialize

    for expected_range in 0..=array_length {
        current_xor ^= expected_range; // @step:compare
    }

    for scan_index in 0..input_array.len() {
        current_xor ^= input_array[scan_index]; // @step:visit
    }

    current_xor // @step:complete
}
