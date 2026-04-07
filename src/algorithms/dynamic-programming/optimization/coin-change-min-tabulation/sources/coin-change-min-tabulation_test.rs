include!("coin-change-min-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn computes_default_input() {
        assert_eq!(coin_change_min_tabulation(11usize, &[1, 5, 10, 25]), 2);
    }

    #[test]
    fn returns_negative_one_when_impossible() {
        assert_eq!(coin_change_min_tabulation(3usize, &[2]), -1);
    }

    #[test]
    fn returns_zero_for_amount_zero() {
        assert_eq!(coin_change_min_tabulation(0usize, &[1]), 0);
    }

    #[test]
    fn greedy_failing_case() {
        assert_eq!(coin_change_min_tabulation(6usize, &[1, 3, 4]), 2);
    }

    #[test]
    fn exact_coin() {
        assert_eq!(coin_change_min_tabulation(25usize, &[1, 5, 10, 25]), 1);
    }

    #[test]
    fn no_combination_possible() {
        assert_eq!(coin_change_min_tabulation(7usize, &[3, 6]), -1);
    }

    #[test]
    fn divides_evenly() {
        assert_eq!(coin_change_min_tabulation(10usize, &[5]), 2);
    }
}
