// Tribonacci tabulation — build DP table iteratively from three base cases

fn tribonacci_tabulation(target_index: usize) -> usize {
    // @step:initialize
    if target_index == 0 {
        return 0; // @step:initialize
    }
    if target_index <= 2 {
        return 1; // @step:initialize
    }
    let mut dp_table = vec![0usize; target_index + 1]; // @step:initialize,fill-table
    dp_table[1] = 1; // @step:fill-table
    dp_table[2] = 1; // @step:fill-table
    // Each entry is the sum of the three preceding entries
    for current_index in 3..=target_index {
        // @step:compute-cell
        dp_table[current_index] =
            dp_table[current_index - 1] + dp_table[current_index - 2] + dp_table[current_index - 3]; // @step:compute-cell,read-cache
    }
    dp_table[target_index] // @step:complete
}

fn main() {
    let target_index = 7;
    let result = tribonacci_tabulation(target_index);
    println!("Tribonacci({}) = {}", target_index, result);
}
