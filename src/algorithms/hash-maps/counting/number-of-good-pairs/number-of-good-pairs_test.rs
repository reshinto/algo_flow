include!("sources/number-of-good-pairs.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_4_for_default() {
        assert_eq!(number_of_good_pairs(&[1, 2, 3, 1, 1, 3]), 4);
    }

    #[test]
    fn test_returns_6_for_all_ones() {
        assert_eq!(number_of_good_pairs(&[1, 1, 1, 1]), 6);
    }

    #[test]
    fn test_returns_0_for_all_distinct() {
        assert_eq!(number_of_good_pairs(&[1, 2, 3]), 0);
    }

    #[test]
    fn test_returns_1_for_1_1() {
        assert_eq!(number_of_good_pairs(&[1, 1]), 1);
    }

    #[test]
    fn test_returns_0_for_single_element() {
        assert_eq!(number_of_good_pairs(&[5]), 0);
    }

    #[test]
    fn test_returns_0_for_empty_array() {
        assert_eq!(number_of_good_pairs(&[]), 0);
    }

    #[test]
    fn test_returns_3_for_2_2_2() {
        assert_eq!(number_of_good_pairs(&[2, 2, 2]), 3);
    }

    #[test]
    fn test_handles_negative_numbers() {
        assert_eq!(number_of_good_pairs(&[-1, -1, 2]), 1);
    }
}
