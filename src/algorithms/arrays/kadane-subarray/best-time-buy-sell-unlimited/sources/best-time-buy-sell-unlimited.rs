// Best Time Buy/Sell (Unlimited) — O(n) greedy: capture every upward price slope
fn best_time_buy_sell_unlimited(prices: &[i32]) -> (i32, Vec<[usize; 2]>) {
    if prices.len() <= 1 {
        // @step:initialize
        return (0, vec![]); // @step:initialize
    }

    let mut total_profit = 0i32; // @step:initialize
    let mut transactions: Vec<[usize; 2]> = Vec::new(); // @step:initialize
    let mut buy_day: i64 = -1; // @step:initialize

    for day_index in 1..prices.len() {
        let previous_price = prices[day_index - 1]; // @step:compare
        let current_price = prices[day_index]; // @step:compare

        if current_price > previous_price {
            // @step:compare — rising day: open a buy if not already in a trade
            if buy_day == -1 {
                // @step:compare
                buy_day = (day_index - 1) as i64; // @step:visit
            }
        } else {
            // Falling or flat: close any open trade
            if buy_day != -1 {
                // @step:compare
                let profit = previous_price - prices[buy_day as usize]; // @step:visit
                total_profit += profit; // @step:visit
                transactions.push([buy_day as usize, day_index - 1]); // @step:visit
                buy_day = -1; // @step:visit
            }
        }
    }

    // Close any remaining open trade at the last day
    if buy_day != -1 {
        // @step:compare
        let last_day = prices.len() - 1;
        let profit = prices[last_day] - prices[buy_day as usize]; // @step:visit
        total_profit += profit; // @step:visit
        transactions.push([buy_day as usize, last_day]); // @step:visit
    }

    (total_profit, transactions) // @step:complete
}
