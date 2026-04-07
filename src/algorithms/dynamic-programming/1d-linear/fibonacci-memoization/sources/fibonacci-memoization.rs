// Fibonacci memoization — top-down recursion with cached subproblems

use std::collections::HashMap;

fn fibonacci_memoization(target_index: i64, memo: &mut HashMap<i64, i64>) -> i64 {
    // @step:initialize
    if target_index <= 1 {
        return target_index; // @step:initialize
    }
    if let Some(&cached) = memo.get(&target_index) {
        return cached; // @step:read-cache
    }
    // Recursively compute subproblems and cache the result to avoid recomputation
    let result = fibonacci_memoization(target_index - 1, memo) // @step:compute-cell
        + fibonacci_memoization(target_index - 2, memo); // @step:compute-cell
    memo.insert(target_index, result); // @step:compute-cell
    result // @step:complete
}

fn main() {
    let mut memo = HashMap::new();
    let target_index = 8;
    let result = fibonacci_memoization(target_index, &mut memo);
    println!("Fibonacci({}) = {}", target_index, result);
}
