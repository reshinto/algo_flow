// Integer Break tabulation — build DP table iteratively from base cases

fn integer_break_tabulation(target_number: usize) -> usize {
    // @step:initialize
    let mut dp_table = vec![0usize; target_number + 1]; // @step:initialize
    dp_table[1] = 1; // @step:fill-table
    // For each i, try every split j + (i - j) and track the best product
    for split_index in 2..=target_number {
        // @step:compute-cell
        for part_index in 1..split_index {
            // @step:compute-cell,read-cache
            let keep_split = part_index * (split_index - part_index); // @step:compute-cell
            let use_dp = part_index * dp_table[split_index - part_index]; // @step:read-cache,compute-cell
            dp_table[split_index] = dp_table[split_index].max(keep_split).max(use_dp); // @step:compute-cell
        }
    }
    dp_table[target_number] // @step:complete
}

fn main() {
    let target_number = 10;
    let result = integer_break_tabulation(target_number);
    println!("Integer break({}): {}", target_number, result);
}
