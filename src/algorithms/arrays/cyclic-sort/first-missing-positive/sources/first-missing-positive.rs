// First Missing Positive — O(n) time, O(1) space via index-as-value placement
fn first_missing_positive(input_array: &[i32]) -> i32 {
    let mut result = input_array.to_vec();
    let array_length = result.len(); // @step:initialize

    // Phase 1: Place each value v in range [1..n] at index v-1 by swapping
    for placement_index in 0..array_length {
        // Keep swapping until the current slot holds its correct value or an out-of-range value
        loop {
            let current_val = result[placement_index];
            if current_val < 1 || current_val > array_length as i32 {
                break;
            }
            let correct_index = (current_val - 1) as usize;
            if result[correct_index] == current_val {
                break;
            }
            let correct_index_val = result[correct_index]; // @step:compare
            result[correct_index] = result[placement_index]; // @step:swap
            result[placement_index] = correct_index_val; // @step:swap
        }
    }

    // Phase 2: Scan for the first index where arr[index] !== index + 1
    for scan_index in 0..array_length {
        if result[scan_index] != (scan_index as i32 + 1) {
            return (scan_index as i32 + 1); // @step:compare
        }
    }

    (array_length as i32 + 1) // @step:complete
}
