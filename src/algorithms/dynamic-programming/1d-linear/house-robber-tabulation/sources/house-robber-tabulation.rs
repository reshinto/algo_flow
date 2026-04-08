// House Robber tabulation — build DP table iteratively from base cases

fn house_robber_tabulation(houses: &[i64]) -> i64 {
    // @step:initialize
    if houses.is_empty() {
        return 0; // @step:initialize
    }
    if houses.len() == 1 {
        return houses[0]; // @step:initialize,fill-table
    }
    let mut dp_table = vec![0i64; houses.len()]; // @step:initialize,fill-table
    dp_table[0] = houses[0]; // @step:fill-table
    dp_table[1] = houses[0].max(houses[1]); // @step:fill-table
    // Each entry is max(rob current + dp[i-2], skip current = dp[i-1])
    for house_index in 2..houses.len() {
        // @step:compute-cell
        dp_table[house_index] = (dp_table[house_index - 1])
            .max(dp_table[house_index - 2] + houses[house_index]); // @step:compute-cell,read-cache
    }
    dp_table[houses.len() - 1] // @step:complete
}

fn main() {
    let houses = vec![2, 7, 9, 3, 1];
    let result = house_robber_tabulation(&houses);
    println!("Max rob from {:?}: {}", houses, result);
}
