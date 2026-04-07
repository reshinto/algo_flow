include!("online-stock-span.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_example() {
        assert_eq!(online_stock_span(&[100, 80, 60, 70, 60, 75, 85]), vec![1, 1, 1, 2, 1, 4, 6]);
    }

    #[test]
    fn single_price() {
        assert_eq!(online_stock_span(&[50]), vec![1]);
    }

    #[test]
    fn strictly_decreasing() {
        assert_eq!(online_stock_span(&[100, 90, 80, 70]), vec![1, 1, 1, 1]);
    }

    #[test]
    fn strictly_increasing() {
        assert_eq!(online_stock_span(&[10, 20, 30, 40]), vec![1, 2, 3, 4]);
    }

    #[test]
    fn all_equal() {
        assert_eq!(online_stock_span(&[50, 50, 50, 50]), vec![1, 2, 3, 4]);
    }

    #[test]
    fn drop_then_rise() {
        assert_eq!(online_stock_span(&[3, 1, 2]), vec![1, 1, 2]);
    }

    #[test]
    fn two_prices_second_greater() {
        assert_eq!(online_stock_span(&[5, 10]), vec![1, 2]);
    }

    #[test]
    fn two_prices_second_less() {
        assert_eq!(online_stock_span(&[10, 5]), vec![1, 1]);
    }

    #[test]
    fn two_equal_prices() {
        assert_eq!(online_stock_span(&[7, 7]), vec![1, 2]);
    }

    #[test]
    fn zigzag_pattern() {
        assert_eq!(online_stock_span(&[1, 3, 1, 3, 1]), vec![1, 2, 1, 4, 1]);
    }
}
