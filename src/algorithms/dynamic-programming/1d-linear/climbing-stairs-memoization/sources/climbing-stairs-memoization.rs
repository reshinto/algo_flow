// Climbing stairs memoization — top-down recursion with cached subproblems

use std::collections::HashMap;

fn climbing_stairs_memoization(number_of_stairs: i64, memo: &mut HashMap<i64, i64>) -> i64 {
    // @step:initialize
    if number_of_stairs <= 1 {
        return 1; // @step:initialize
    }
    if let Some(&cached) = memo.get(&number_of_stairs) {
        return cached; // @step:read-cache
    }
    // Recursively count distinct ways from the previous two steps, cache to avoid recomputation
    // @step:push-call
    let result = climbing_stairs_memoization(number_of_stairs - 1, memo) // @step:compute-cell
        + climbing_stairs_memoization(number_of_stairs - 2, memo); // @step:compute-cell
    memo.insert(number_of_stairs, result); // @step:compute-cell
    // @step:pop-call
    result // @step:complete
}

fn main() {
    let mut memo = HashMap::new();
    let number_of_stairs = 7;
    let result = climbing_stairs_memoization(number_of_stairs, &mut memo);
    println!("Ways to climb {} stairs: {}", number_of_stairs, result);
}
