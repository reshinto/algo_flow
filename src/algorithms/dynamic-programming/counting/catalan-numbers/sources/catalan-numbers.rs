// Catalan numbers tabulation — build DP table iteratively from the base case

fn catalan_number(target_index: usize) -> usize {
    // @step:initialize
    if target_index == 0 {
        return 1; // @step:initialize
    }
    let mut dp_table = vec![0usize; target_index + 1]; // @step:initialize,fill-table
    dp_table[0] = 1; // @step:fill-table
    // Each entry is the sum C(i) = sum over k from 0 to i-1 of C(k) * C(i-1-k)
    for outer_index in 1..=target_index {
        // @step:compute-cell
        let mut running_sum = 0usize; // @step:compute-cell
        for split_index in 0..outer_index {
            // @step:read-cache
            running_sum += dp_table[split_index] * dp_table[outer_index - 1 - split_index]; // @step:read-cache,compute-cell
        }
        dp_table[outer_index] = running_sum; // @step:compute-cell
    }
    dp_table[target_index] // @step:complete
}

fn main() {
    let target_index = 5;
    let result = catalan_number(target_index);
    println!("Catalan({}) = {}", target_index, result);
}
