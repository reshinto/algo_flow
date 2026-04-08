// Integer Break memoization — top-down recursion to maximize product of parts

use std::collections::HashMap;

fn integer_break_memoization(target_number: i64, memo: &mut HashMap<i64, i64>) -> i64 {
    // @step:initialize
    if target_number == 1 {
        return 1; // @step:initialize
    }
    if let Some(&cached) = memo.get(&target_number) {
        return cached; // @step:read-cache
    }
    // @step:push-call
    let mut max_product = 0i64; // @step:compute-cell
    for part_size in 1..target_number {
        // @step:compute-cell
        let remainder = target_number - part_size; // @step:compute-cell
        let split_product = part_size * remainder; // @step:compute-cell
        let recurse_product = part_size * integer_break_memoization(remainder, memo); // @step:compute-cell
        max_product = max_product.max(split_product).max(recurse_product); // @step:compute-cell
    }
    memo.insert(target_number, max_product); // @step:compute-cell
    max_product // @step:pop-call
}

fn main() {
    let mut memo = HashMap::new();
    let target_number = 10;
    let result = integer_break_memoization(target_number, &mut memo);
    println!("Integer break({}): {}", target_number, result);
}
