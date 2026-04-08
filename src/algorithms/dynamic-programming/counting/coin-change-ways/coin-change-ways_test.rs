include!("sources/coin-change-ways.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn four_ways_for_5_with_1_2_5() {
        assert_eq!(coin_change_ways(5usize, &[1, 2, 5]), 4usize);
    }

    #[test]
    fn zero_ways_for_3_with_coin_2() {
        assert_eq!(coin_change_ways(3usize, &[2]), 0usize);
    }

    #[test]
    fn one_way_for_amount_zero() {
        assert_eq!(coin_change_ways(0usize, &[1]), 1usize);
    }

    #[test]
    fn three_ways_for_5_with_1_2() {
        assert_eq!(coin_change_ways(5usize, &[1, 2]), 3usize);
    }

    #[test]
    fn one_way_for_exact_match() {
        assert_eq!(coin_change_ways(2usize, &[2]), 1usize);
    }

    #[test]
    fn zero_ways_when_no_coin_fits() {
        assert_eq!(coin_change_ways(1usize, &[2, 5]), 0usize);
    }

    #[test]
    fn ten_ways_for_10_with_1_2_5() {
        assert_eq!(coin_change_ways(10usize, &[1, 2, 5]), 10usize);
    }
}
