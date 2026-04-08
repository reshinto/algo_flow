// Coin Change Ways (Tabulation) — count distinct ways to make each amount using given coins

fn coin_change_ways(amount: usize, coins: &[usize]) -> usize {
    // @step:initialize
    let mut dp_table = vec![0usize; amount + 1]; // @step:initialize,fill-table
    dp_table[0] = 1; // @step:fill-table
    // Outer loop over coins — ordering ensures we count combinations, not permutations
    for &coin in coins {
        // @step:compute-cell
        for current_amount in coin..=amount {
            // @step:compute-cell
            dp_table[current_amount] += dp_table[current_amount - coin]; // @step:compute-cell,read-cache
        }
    }
    dp_table[amount] // @step:complete
}

fn main() {
    let amount = 5;
    let coins = vec![1, 2, 5];
    let result = coin_change_ways(amount, &coins);
    println!("Ways to make {}: {}", amount, result);
}
