// Online Stock Span — for each day's price, count consecutive days (including today) where price <= today's price
fn online_stock_span(prices: &[i32]) -> Vec<i32> {
    let mut result: Vec<i32> = vec![0; prices.len()]; // @step:initialize
    // Stack holds (price, span) pairs in monotonic decreasing order by price
    let mut stack: Vec<(i32, i32)> = Vec::new(); // @step:initialize

    for price_idx in 0..prices.len() {
        let current_price = prices[price_idx]; // @step:visit
        let mut span_count: i32 = 1; // @step:visit

        // Pop all stack entries with price <= currentPrice, accumulating their spans
        while let Some(&(top_price, top_span)) = stack.last() {
            if top_price <= current_price { // @step:compare
                span_count += top_span; // @step:maintain-monotonic
                stack.pop(); // @step:maintain-monotonic
            } else {
                break;
            }
        }

        stack.push((current_price, span_count)); // @step:push
        result[price_idx] = span_count; // @step:resolve
    }

    result // @step:complete
}

fn main() {
    let prices = vec![100, 80, 60, 70, 60, 75, 85];
    println!("{:?}", online_stock_span(&prices));
}
