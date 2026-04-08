// Difference Array — O(n + q) range updates via difference array and prefix sum reconstruction
fn difference_array(array_length: usize, updates: &[[i32; 3]]) -> Vec<i32> {
    let mut diff_array = vec![0i32; array_length + 1]; // @step:initialize
    let mut result = vec![0i32; array_length]; // @step:initialize

    // Apply each range update [left, right, delta] to the difference array
    for update_index in 0..updates.len() {
        let left_bound = updates[update_index][0] as usize; // @step:visit
        let right_bound = updates[update_index][1] as usize; // @step:visit
        let delta = updates[update_index][2]; // @step:visit
        diff_array[left_bound] += delta; // @step:compare
        if right_bound + 1 < diff_array.len() {
            // @step:compare
            diff_array[right_bound + 1] -= delta; // @step:compare
        }
    }

    // Reconstruct result via prefix sum of the difference array
    let mut running_sum = 0i32; // @step:visit
    for scan_index in 0..array_length {
        running_sum += diff_array[scan_index]; // @step:visit
        result[scan_index] = running_sum; // @step:visit
    }

    result // @step:complete
}
