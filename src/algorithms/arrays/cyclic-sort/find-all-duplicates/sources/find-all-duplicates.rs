// Find All Duplicates — O(n) time, O(1) space via sign-negation index marking
fn find_all_duplicates(input_array: &[i32]) -> Vec<i32> {
    let mut result = input_array.to_vec(); // @step:initialize
    let mut duplicates: Vec<i32> = Vec::new(); // @step:initialize

    // Mark visited positions by negating the value at the mapped index
    for scan_index in 0..result.len() {
        let mapped_index = (result[scan_index].abs() - 1) as usize; // @step:compare

        if result[mapped_index] < 0 {
            // Already negative means we visited this index before — duplicate found
            duplicates.push(result[scan_index].abs()); // @step:compare
        } else {
            result[mapped_index] = -result[mapped_index]; // @step:swap
        }
    }

    duplicates // @step:complete
}
