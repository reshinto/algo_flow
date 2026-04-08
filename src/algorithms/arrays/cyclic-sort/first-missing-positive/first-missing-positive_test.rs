include!("sources/first-missing-positive.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_input() {
        assert_eq!(first_missing_positive(&[3, 4, -1, 1, 7, 5, 2]), 6);
    }

    #[test]
    fn test_one_two_zero() {
        assert_eq!(first_missing_positive(&[1, 2, 0]), 3);
    }

    #[test]
    fn test_three_four_neg_one() {
        assert_eq!(first_missing_positive(&[3, 4, -1, 1]), 2);
    }

    #[test]
    fn test_large_values() {
        assert_eq!(first_missing_positive(&[7, 8, 9, 11, 12]), 1);
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(first_missing_positive(&[]), 1);
    }

    #[test]
    fn test_complete_sequence() {
        assert_eq!(first_missing_positive(&[1, 2, 3, 4, 5]), 6);
    }

    #[test]
    fn test_all_negative() {
        assert_eq!(first_missing_positive(&[-1, -2, -3]), 1);
    }

    #[test]
    fn test_single_one() {
        assert_eq!(first_missing_positive(&[1]), 2);
    }

    #[test]
    fn test_single_two() {
        assert_eq!(first_missing_positive(&[2]), 1);
    }

    #[test]
    fn test_duplicates() {
        assert_eq!(first_missing_positive(&[1, 1, 2, 2]), 3);
    }
}
