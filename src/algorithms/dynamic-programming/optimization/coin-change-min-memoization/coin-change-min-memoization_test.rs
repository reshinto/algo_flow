include!("sources/coin-change-min-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_zero_for_amount_zero() {
        assert_eq!(coin_change_min_memoization(0, &[1, 5, 10]), 0);
    }

    #[test]
    fn returns_negative_one_when_impossible() {
        assert_eq!(coin_change_min_memoization(3, &[2]), -1);
    }

    #[test]
    fn returns_one_when_exact_coin() {
        assert_eq!(coin_change_min_memoization(5, &[1, 5, 10]), 1);
    }

    #[test]
    fn computes_default_input() {
        assert_eq!(coin_change_min_memoization(11, &[1, 5, 10, 25]), 2);
    }

    #[test]
    fn computes_11_with_1_5_6_9() {
        assert_eq!(coin_change_min_memoization(11, &[1, 5, 6, 9]), 2);
    }

    #[test]
    fn computes_3_with_1_2() {
        assert_eq!(coin_change_min_memoization(3, &[1, 2]), 2);
    }

    #[test]
    fn computes_6_with_1_3_4() {
        assert_eq!(coin_change_min_memoization(6, &[1, 3, 4]), 2);
    }

    #[test]
    fn computes_100_with_standard_coins() {
        assert_eq!(coin_change_min_memoization(100, &[1, 5, 10, 25]), 4);
    }
}
