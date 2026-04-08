// Coin Change (Min Coins) tabulation — find minimum coins needed to make amount

fn coin_change_min_tabulation(amount: usize, coins: &[usize]) -> i64 {
    // @step:initialize
    let table_size = amount + 1; // @step:initialize
    let mut dp_table = vec![i64::MAX; table_size]; // @step:initialize,fill-table
    dp_table[0] = 0; // @step:fill-table
    // For each amount, try every coin and take the minimum
    for current_amount in 1..=amount {
        // @step:compute-cell
        for &coin in coins {
            if current_amount >= coin && dp_table[current_amount - coin] != i64::MAX {
                // @step:read-cache
                let candidate = dp_table[current_amount - coin] + 1; // @step:read-cache
                if candidate < dp_table[current_amount] {
                    dp_table[current_amount] = candidate; // @step:compute-cell
                }
            }
        }
    }
    if dp_table[amount] == i64::MAX { -1 } else { dp_table[amount] } // @step:complete
}

fn main() {
    let amount = 11;
    let coins = vec![1, 5, 6, 9];
    let result = coin_change_min_tabulation(amount, &coins);
    println!("Min coins for {}: {}", amount, result);
}
