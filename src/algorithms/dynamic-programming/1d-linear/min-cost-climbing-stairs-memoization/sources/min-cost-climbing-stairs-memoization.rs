// Min Cost Climbing Stairs memoization — top-down recursion with cached subproblems

use std::collections::HashMap;

fn compute_memo(costs: &[i64], step: usize, memo: &mut HashMap<usize, i64>) -> i64 {
    if step <= 1 {
        return 0; // @step:initialize
    }
    if let Some(&cached) = memo.get(&step) {
        return cached; // @step:read-cache
    }
    // Recursively compute the minimum cost from each of the two preceding steps, cache to avoid recomputation
    // @step:push-call
    let cost_from_one = compute_memo(costs, step - 1, memo) + costs.get(step - 1).copied().unwrap_or(0); // @step:compute-cell
    let cost_from_two = compute_memo(costs, step - 2, memo) + costs.get(step - 2).copied().unwrap_or(0); // @step:compute-cell
    let result = cost_from_one.min(cost_from_two); // @step:compute-cell
    memo.insert(step, result); // @step:compute-cell
    // @step:pop-call
    result // @step:complete
}

fn min_cost_climbing_stairs_memoization(costs: &[i64]) -> i64 {
    // @step:initialize
    let mut memo = HashMap::new(); // @step:initialize
    compute_memo(costs, costs.len(), &mut memo)
}

fn main() {
    let costs = vec![10, 15, 20];
    let result = min_cost_climbing_stairs_memoization(&costs);
    println!("Min cost to climb {:?}: {}", costs, result);
}
