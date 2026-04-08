// House Robber memoization — top-down recursion with cached subproblems

use std::collections::HashMap;

fn rob(houses: &[i64], house_index: usize, memo: &mut HashMap<usize, i64>) -> i64 {
    if house_index == 0 {
        // @step:fill-table
        let value = houses[0]; // @step:fill-table
        memo.insert(0, value); // @step:fill-table
        return value; // @step:fill-table
    }
    if house_index == 1 {
        // @step:fill-table
        let base_value = houses[0].max(houses[1]); // @step:fill-table
        memo.insert(1, base_value); // @step:fill-table
        return base_value; // @step:fill-table
    }
    if let Some(&cached) = memo.get(&house_index) {
        return cached; // @step:read-cache
    }
    // @step:push-call
    let skip_current = rob(houses, house_index - 1, memo); // @step:compute-cell
    let rob_current = rob(houses, house_index - 2, memo) + houses[house_index]; // @step:compute-cell
    let max_profit = skip_current.max(rob_current); // @step:compute-cell
    memo.insert(house_index, max_profit); // @step:compute-cell
    max_profit // @step:pop-call
}

fn house_robber_memoization(houses: &[i64]) -> i64 {
    // @step:initialize
    if houses.is_empty() {
        return 0; // @step:initialize
    }
    if houses.len() == 1 {
        return houses[0]; // @step:initialize
    }
    let mut memo = HashMap::new();
    rob(houses, houses.len() - 1, &mut memo) // @step:complete
}

fn main() {
    let houses = vec![2, 7, 9, 3, 1];
    let result = house_robber_memoization(&houses);
    println!("Max rob from {:?}: {}", houses, result);
}
