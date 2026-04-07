include!("contains-duplicate.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_true_for_default_with_repeated_value() {
        assert!(contains_duplicate(&[1, 2, 3, 1]));
    }

    #[test]
    fn test_returns_false_when_all_unique() {
        assert!(!contains_duplicate(&[1, 2, 3, 4]));
    }

    #[test]
    fn test_returns_false_for_single_element() {
        assert!(!contains_duplicate(&[42]));
    }

    #[test]
    fn test_returns_false_for_empty_array() {
        assert!(!contains_duplicate(&[]));
    }

    #[test]
    fn test_returns_true_when_first_two_elements_equal() {
        assert!(contains_duplicate(&[5, 5, 6, 7]));
    }

    #[test]
    fn test_returns_true_when_duplicate_at_end() {
        assert!(contains_duplicate(&[1, 2, 3, 4, 5, 1]));
    }

    #[test]
    fn test_returns_true_when_all_same() {
        assert!(contains_duplicate(&[7, 7, 7, 7]));
    }

    #[test]
    fn test_handles_negative_numbers() {
        assert!(contains_duplicate(&[-1, -2, -3, -1]));
    }

    #[test]
    fn test_returns_false_when_negatives_all_distinct() {
        assert!(!contains_duplicate(&[-3, -2, -1, 0]));
    }
}
