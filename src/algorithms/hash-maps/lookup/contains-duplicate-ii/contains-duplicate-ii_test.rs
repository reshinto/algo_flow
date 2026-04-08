include!("sources/contains-duplicate-ii.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_true_for_default_within_max_distance() {
        assert!(contains_duplicate_ii(&[1, 2, 3, 1], 3));
    }

    #[test]
    fn test_returns_false_when_duplicate_beyond_max_distance() {
        assert!(!contains_duplicate_ii(&[1, 2, 3, 1], 2));
    }

    #[test]
    fn test_returns_true_when_adjacent_equal_and_max_distance_1() {
        assert!(contains_duplicate_ii(&[1, 1, 3, 4], 1));
    }

    #[test]
    fn test_returns_false_for_all_unique() {
        assert!(!contains_duplicate_ii(&[1, 2, 3, 4], 3));
    }

    #[test]
    fn test_returns_false_for_single_element() {
        assert!(!contains_duplicate_ii(&[42], 1));
    }

    #[test]
    fn test_returns_false_for_empty_array() {
        assert!(!contains_duplicate_ii(&[], 0));
    }

    #[test]
    fn test_returns_true_when_max_distance_equals_full_length() {
        assert!(contains_duplicate_ii(&[1, 2, 3, 4, 1], 4));
    }

    #[test]
    fn test_returns_false_when_max_distance_is_zero() {
        assert!(!contains_duplicate_ii(&[1, 2, 3, 4], 0));
    }

    #[test]
    fn test_handles_negative_numbers() {
        assert!(contains_duplicate_ii(&[-1, 0, -1], 2));
    }

    #[test]
    fn test_updates_stored_index_on_reappearance() {
        assert!(!contains_duplicate_ii(&[1, 2, 1, 2], 1));
    }

    #[test]
    fn test_returns_true_when_updated_index_creates_qualifying_pair() {
        assert!(contains_duplicate_ii(&[1, 0, 1, 1], 1));
    }
}
