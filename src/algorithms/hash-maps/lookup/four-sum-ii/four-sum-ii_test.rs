include!("sources/four-sum-ii.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_2_for_default() {
        assert_eq!(four_sum_ii(&[1, 2], &[-2, -1], &[-1, 2], &[0, 2]), 2);
    }

    #[test]
    fn test_returns_0_when_no_zero_sum() {
        assert_eq!(four_sum_ii(&[1, 2], &[3, 4], &[5, 6], &[7, 8]), 0);
    }

    #[test]
    fn test_handles_all_zeros() {
        assert_eq!(four_sum_ii(&[0, 0], &[0, 0], &[0, 0], &[0, 0]), 16);
    }

    #[test]
    fn test_handles_single_element_arrays() {
        assert_eq!(four_sum_ii(&[1], &[-1], &[1], &[-1]), 1);
    }

    #[test]
    fn test_handles_negative_values() {
        assert_eq!(four_sum_ii(&[-1, -2], &[1, 2], &[1, 2], &[-1, -2]), 6);
    }

    #[test]
    fn test_counts_all_tuples_not_unique() {
        assert_eq!(four_sum_ii(&[1, 1], &[-1, -1], &[0], &[0]), 4);
    }

    #[test]
    fn test_handles_large_complementary_values() {
        assert_eq!(four_sum_ii(&[1000], &[-1000], &[500], &[-500]), 1);
    }
}
