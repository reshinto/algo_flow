// LIS tabulation — O(n^2) bottom-up DP for longest increasing subsequence length

fn lis_length(sequence: &[i64]) -> usize {
    // @step:initialize
    let sequence_length = sequence.len(); // @step:initialize
    if sequence_length == 0 {
        return 0; // @step:initialize
    }
    let mut dp_table = vec![1usize; sequence_length]; // @step:initialize,fill-table
    // Each element is a subsequence of length 1
    let mut max_length = 1usize; // @step:fill-table
    // For each index, scan all previous indices
    for outer_index in 1..sequence_length {
        // @step:compute-cell
        for inner_index in 0..outer_index {
            // @step:read-cache
            if sequence[inner_index] < sequence[outer_index] {
                // @step:read-cache
                if dp_table[inner_index] + 1 > dp_table[outer_index] {
                    dp_table[outer_index] = dp_table[inner_index] + 1; // @step:compute-cell,read-cache
                }
            }
        }
        if dp_table[outer_index] > max_length {
            // @step:compute-cell
            max_length = dp_table[outer_index]; // @step:compute-cell
        }
    }
    max_length // @step:complete
}

fn main() {
    let sequence = vec![10, 9, 2, 5, 3, 7, 101, 18];
    let result = lis_length(&sequence);
    println!("LIS length of {:?}: {}", sequence, result);
}
