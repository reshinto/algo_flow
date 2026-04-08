include!("sources/best-time-buy-sell.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_classic_example() {
        let (max_profit, buy_day, sell_day) = best_time_buy_sell(&[7, 1, 5, 3, 6, 4]);
        assert_eq!(max_profit, 5);
        assert_eq!(buy_day, 1);
        assert_eq!(sell_day, 4);
    }

    #[test]
    fn test_always_decreasing() {
        let (max_profit, _, _) = best_time_buy_sell(&[7, 6, 4, 3, 1]);
        assert_eq!(max_profit, 0);
    }

    #[test]
    fn test_strictly_increasing() {
        let (max_profit, buy_day, sell_day) = best_time_buy_sell(&[1, 2, 3, 4, 5]);
        assert_eq!(max_profit, 4);
        assert_eq!(buy_day, 0);
        assert_eq!(sell_day, 4);
    }

    #[test]
    fn test_single_element() {
        let (max_profit, _, _) = best_time_buy_sell(&[42]);
        assert_eq!(max_profit, 0);
    }

    #[test]
    fn test_empty_array() {
        let (max_profit, buy_day, sell_day) = best_time_buy_sell(&[]);
        assert_eq!(max_profit, 0);
        assert_eq!(buy_day, -1);
        assert_eq!(sell_day, -1);
    }

    #[test]
    fn test_price_spike_middle() {
        let (max_profit, buy_day, sell_day) = best_time_buy_sell(&[1, 100, 2, 3]);
        assert_eq!(max_profit, 99);
        assert_eq!(buy_day, 0);
        assert_eq!(sell_day, 1);
    }

    #[test]
    fn test_best_at_end() {
        let (max_profit, buy_day, sell_day) = best_time_buy_sell(&[9, 8, 7, 1, 10]);
        assert_eq!(max_profit, 9);
        assert_eq!(buy_day, 3);
        assert_eq!(sell_day, 4);
    }

    #[test]
    fn test_multiple_minimums() {
        let (max_profit, buy_day, sell_day) = best_time_buy_sell(&[5, 3, 1, 2, 8]);
        assert_eq!(max_profit, 7);
        assert_eq!(buy_day, 2);
        assert_eq!(sell_day, 4);
    }
}
