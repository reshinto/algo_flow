// Best Time to Buy and Sell Stock — O(n) single-pass maximum profit via min-price tracking
fn best_time_buy_sell(prices: &[i32]) -> (i32, i64, i64) {
    if prices.is_empty() {
        // @step:initialize
        return (0, -1, -1); // @step:initialize
    }

    let mut min_price = prices[0]; // @step:initialize
    let mut max_profit = 0i32; // @step:initialize
    let mut buy_day = 0usize;
    let mut sell_day = 0usize;
    let mut current_buy_day = 0usize;

    for day_index in 1..prices.len() {
        let current_price = prices[day_index]; // @step:compare

        if current_price < min_price {
            // @step:compare
            min_price = current_price; // @step:visit
            current_buy_day = day_index; // @step:visit
        }

        let potential_profit = current_price - min_price; // @step:compare

        if potential_profit > max_profit {
            // @step:compare
            max_profit = potential_profit; // @step:visit
            buy_day = current_buy_day; // @step:visit
            sell_day = day_index; // @step:visit
        }
    }

    (max_profit, buy_day as i64, sell_day as i64) // @step:complete
}
