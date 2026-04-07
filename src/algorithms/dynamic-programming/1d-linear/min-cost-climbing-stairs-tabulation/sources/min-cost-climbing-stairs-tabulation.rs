// Min Cost Climbing Stairs tabulation — minimum cost to reach the top

fn min_cost_climbing_stairs_tabulation(costs: &[i64]) -> i64 {
    // @step:initialize
    let stair_count = costs.len(); // @step:initialize
    if stair_count == 0 {
        return 0; // @step:initialize
    }
    let mut dp_table = vec![0i64; stair_count + 1]; // @step:initialize,fill-table
    dp_table[0] = 0; // @step:fill-table
    dp_table[1] = 0; // @step:fill-table
    // Each entry is the minimum cost to reach that step from either one or two steps below
    for current_step in 2..=stair_count {
        // @step:compute-cell
        let from_one = dp_table[current_step - 1] + costs[current_step - 1]; // @step:compute-cell,read-cache
        let from_two = dp_table[current_step - 2] + costs[current_step - 2]; // @step:compute-cell,read-cache
        dp_table[current_step] = from_one.min(from_two);
    }
    dp_table[stair_count] // @step:complete
}

fn main() {
    let costs = vec![10, 15, 20];
    let result = min_cost_climbing_stairs_tabulation(&costs);
    println!("Min cost to climb {:?}: {}", costs, result);
}
