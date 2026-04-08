// 0/1 Knapsack (Tabulation) — max value from items with weight/value pairs within capacity

fn knapsack_01(weights: &[usize], values: &[usize], capacity: usize) -> usize {
    // @step:initialize
    let item_count = weights.len(); // @step:initialize
    let mut dp_table = vec![0usize; capacity + 1]; // @step:initialize,fill-table
    // For each item, iterate capacity right-to-left to enforce 0/1 constraint
    for item_index in 0..item_count {
        // @step:compute-cell
        let item_weight = weights[item_index]; // @step:compute-cell
        let item_value = values[item_index]; // @step:compute-cell
        let mut capacity_w = capacity;
        while capacity_w >= item_weight {
            // @step:read-cache
            let without_item = dp_table[capacity_w]; // @step:read-cache
            let with_item = dp_table[capacity_w - item_weight] + item_value; // @step:read-cache
            if with_item > without_item {
                dp_table[capacity_w] = with_item; // @step:compute-cell
            }
            if capacity_w == 0 {
                break;
            }
            capacity_w -= 1;
        }
    }
    dp_table[capacity] // @step:complete
}

fn main() {
    let weights = vec![2, 3, 4, 5];
    let values = vec![3, 4, 5, 6];
    let capacity = 8;
    let result = knapsack_01(&weights, &values, capacity);
    println!("Max knapsack value: {}", result);
}
