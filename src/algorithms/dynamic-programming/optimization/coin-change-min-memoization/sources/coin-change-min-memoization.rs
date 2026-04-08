// Coin Change Minimum — top-down memoization: find the fewest coins summing to target amount

use std::collections::HashMap;

fn min_coins(remaining: i64, coins: &[i64], memo: &mut HashMap<i64, i64>) -> i64 {
    if remaining == 0 {
        // @step:fill-table
        memo.insert(0, 0); // @step:fill-table
        return 0; // @step:fill-table
    }
    if remaining < 0 {
        return -1; // @step:fill-table
    }
    if let Some(&cached) = memo.get(&remaining) {
        return cached; // @step:read-cache
    }
    // @step:push-call
    let mut best_result = -1i64;
    for &coin in coins {
        // @step:compute-cell
        let sub_result = min_coins(remaining - coin, coins, memo); // @step:compute-cell
        if sub_result >= 0 {
            // @step:compute-cell
            let candidate = sub_result + 1; // @step:compute-cell
            if best_result == -1 || candidate < best_result {
                // @step:compute-cell
                best_result = candidate; // @step:compute-cell
            }
        }
    }
    memo.insert(remaining, best_result); // @step:compute-cell
    best_result // @step:pop-call
}

fn coin_change_min_memoization(amount: i64, coins: &[i64]) -> i64 {
    // @step:initialize
    let mut memo = HashMap::new(); // @step:initialize
    min_coins(amount, coins, &mut memo) // @step:complete
}

fn main() {
    let amount = 11;
    let coins = vec![1, 5, 6, 9];
    let result = coin_change_min_memoization(amount, &coins);
    println!("Min coins for {}: {}", amount, result);
}
