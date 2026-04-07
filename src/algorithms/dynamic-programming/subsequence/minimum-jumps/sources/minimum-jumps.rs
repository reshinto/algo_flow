// Minimum Jumps tabulation — build DP table iteratively from base case

fn minimum_jumps(jumps: &[usize]) -> i64 {
    // @step:initialize
    let array_length = jumps.len(); // @step:initialize
    if array_length == 0 {
        return 0; // @step:initialize
    }
    let mut dp_table = vec![i64::MAX; array_length]; // @step:initialize,fill-table
    dp_table[0] = 0; // @step:fill-table
    // For each position, check all prior positions that can reach it
    for target_index in 1..array_length {
        // @step:compute-cell
        for source_index in 0..target_index {
            // @step:read-cache
            if dp_table[source_index] != i64::MAX
                && source_index + jumps[source_index] >= target_index
            {
                // @step:read-cache
                let candidate = dp_table[source_index] + 1;
                if candidate < dp_table[target_index] {
                    dp_table[target_index] = candidate; // @step:compute-cell,read-cache
                }
            }
        }
    }
    if dp_table[array_length - 1] == i64::MAX {
        -1
    } else {
        dp_table[array_length - 1] // @step:complete
    }
}

fn main() {
    let jumps = vec![2, 3, 1, 1, 4];
    let result = minimum_jumps(&jumps);
    println!("Minimum jumps for {:?}: {}", jumps, result);
}
