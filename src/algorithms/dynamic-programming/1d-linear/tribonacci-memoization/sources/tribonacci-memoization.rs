// Tribonacci memoization — top-down recursion with cached subproblems

use std::collections::HashMap;

fn tribonacci_memoization(target_index: i64, memo: &mut HashMap<i64, i64>) -> i64 {
    // @step:initialize
    if target_index == 0 {
        return 0; // @step:initialize
    }
    if target_index <= 2 {
        return 1; // @step:initialize
    }
    if let Some(&cached) = memo.get(&target_index) {
        return cached; // @step:read-cache
    }
    // Recursively compute the three preceding subproblems and cache the result
    let result = tribonacci_memoization(target_index - 1, memo) // @step:compute-cell
        + tribonacci_memoization(target_index - 2, memo) // @step:compute-cell
        + tribonacci_memoization(target_index - 3, memo); // @step:compute-cell
    memo.insert(target_index, result); // @step:compute-cell
    result // @step:complete
}

fn main() {
    let mut memo = HashMap::new();
    let target_index = 7;
    let result = tribonacci_memoization(target_index, &mut memo);
    println!("Tribonacci({}) = {}", target_index, result);
}
