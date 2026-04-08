// Lomuto Partition — O(n) partition scheme using last element as pivot and a boundary pointer
fn lomuto_partition(input_array: &[i32]) -> (i64, Vec<i32>) {
    if input_array.is_empty() {
        // @step:initialize
        return (-1, vec![]); // @step:initialize
    }

    let mut result = input_array.to_vec(); // @step:initialize
    let pivot_original_index = result.len() - 1;
    let pivot_value = result[pivot_original_index]; // @step:initialize
    let mut boundary_index = 0usize; // @step:initialize

    for scan_index in 0..pivot_original_index {
        // @step:visit
        if result[scan_index] <= pivot_value {
            // @step:compare
            result.swap(boundary_index, scan_index); // @step:swap
            boundary_index += 1; // @step:visit
        }
    }

    // Place pivot into its final sorted position
    result.swap(boundary_index, pivot_original_index); // @step:swap

    (boundary_index as i64, result) // @step:complete
}
