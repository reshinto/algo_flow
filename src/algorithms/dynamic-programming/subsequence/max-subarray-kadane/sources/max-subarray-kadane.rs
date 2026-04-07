// Maximum Subarray Kadane — build DP table where dp[i] = max subarray sum ending at index i

fn max_subarray_kadane(array: &[i64]) -> i64 {
    // @step:initialize
    if array.is_empty() {
        return 0; // @step:initialize
    }
    let mut dp_table = vec![0i64; array.len()]; // @step:initialize,fill-table
    dp_table[0] = array[0]; // @step:fill-table
    let mut max_sum = dp_table[0]; // @step:fill-table
    // Each entry: extend the previous subarray or start fresh at current element
    for element_index in 1..array.len() {
        // @step:compute-cell
        dp_table[element_index] = array[element_index].max(
            dp_table[element_index - 1] + array[element_index],
        ); // @step:compute-cell,read-cache
        if dp_table[element_index] > max_sum {
            // @step:compute-cell
            max_sum = dp_table[element_index]; // @step:compute-cell
        }
    }
    max_sum // @step:complete
}

fn main() {
    let array = vec![-2, 1, -3, 4, -1, 2, 1, -5, 4];
    let result = max_subarray_kadane(&array);
    println!("Max subarray sum of {:?}: {}", array, result);
}
