include!("sources/best-time-buy-sell-unlimited.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        let (total_profit, _) = best_time_buy_sell_unlimited(&[7, 1, 5, 3, 6, 4]);
        assert_eq!(total_profit, 7);
    }

    #[test]
    fn test_empty_prices() {
        let (total_profit, transactions) = best_time_buy_sell_unlimited(&[]);
        assert_eq!(total_profit, 0);
        assert!(transactions.is_empty());
    }

    #[test]
    fn test_single_price() {
        let (total_profit, _) = best_time_buy_sell_unlimited(&[5]);
        assert_eq!(total_profit, 0);
    }

    #[test]
    fn test_always_falling() {
        let (total_profit, transactions) = best_time_buy_sell_unlimited(&[5, 4, 3, 2, 1]);
        assert_eq!(total_profit, 0);
        assert!(transactions.is_empty());
    }

    #[test]
    fn test_strictly_increasing() {
        let (total_profit, _) = best_time_buy_sell_unlimited(&[1, 2, 3, 4, 5]);
        assert_eq!(total_profit, 4);
    }

    #[test]
    fn test_alternating() {
        let (total_profit, _) = best_time_buy_sell_unlimited(&[1, 5, 1, 5, 1, 5]);
        assert_eq!(total_profit, 12);
    }

    #[test]
    fn test_all_equal() {
        let (total_profit, _) = best_time_buy_sell_unlimited(&[3, 3, 3, 3]);
        assert_eq!(total_profit, 0);
    }

    #[test]
    fn test_two_prices_gain() {
        let (total_profit, transactions) = best_time_buy_sell_unlimited(&[1, 7]);
        assert_eq!(total_profit, 6);
        assert_eq!(transactions.len(), 1);
    }

    #[test]
    fn test_transaction_days() {
        let (total_profit, transactions) = best_time_buy_sell_unlimited(&[1, 5, 3, 7]);
        assert_eq!(total_profit, 8);
        assert_eq!(transactions.len(), 2);
        assert_eq!(transactions[0], [0, 1]);
        assert_eq!(transactions[1], [2, 3]);
    }
}
