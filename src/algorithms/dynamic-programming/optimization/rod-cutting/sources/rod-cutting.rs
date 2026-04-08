// Rod Cutting (Tabulation) — find maximum revenue from cutting a rod of length n

fn rod_cutting(prices: &[i64]) -> i64 {
    // @step:initialize
    let rod_length = prices.len(); // @step:initialize
    let mut dp_table = vec![0i64; rod_length + 1]; // @step:initialize,fill-table
    // dp[0] = 0 (base case: zero revenue for zero-length rod)
    for current_length in 1..=rod_length {
        // @step:compute-cell
        for cut_length in 1..=current_length {
            // @step:read-cache
            let remainder = current_length - cut_length; // @step:read-cache
            let candidate = prices[cut_length - 1] + dp_table[remainder]; // @step:read-cache
            if candidate > dp_table[current_length] {
                dp_table[current_length] = candidate; // @step:compute-cell
            }
        }
    }
    dp_table[rod_length] // @step:complete
}

fn main() {
    let prices = vec![1, 5, 8, 9, 10, 17, 17, 20];
    let result = rod_cutting(&prices);
    println!("Max rod cutting revenue: {}", result);
}
