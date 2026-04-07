// Fibonacci tabulation — build DP table iteratively from base cases

fn fibonacci_tabulation(target_index: usize) -> usize {
    // @step:initialize
    if target_index <= 1 {
        return target_index; // @step:initialize
    }
    let mut dp_table = vec![0usize; target_index + 1]; // @step:initialize,fill-table
    dp_table[1] = 1; // @step:fill-table
    // Each entry is the sum of the two preceding entries
    for current_index in 2..=target_index {
        // @step:compute-cell
        dp_table[current_index] = dp_table[current_index - 1] + dp_table[current_index - 2]; // @step:compute-cell,read-cache
    }
    dp_table[target_index] // @step:complete
}

fn main() {
    let target_index = 8;
    let result = fibonacci_tabulation(target_index);
    println!("Fibonacci({}) = {}", target_index, result);
}
