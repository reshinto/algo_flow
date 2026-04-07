include!("upper-bound-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_index_of_first_element_strictly_greater() {
        assert_eq!(upper_bound_search(&[1, 3, 3, 5, 5, 5, 8, 12], 5), 6);
    }

    #[test]
    fn returns_zero_when_target_smaller_than_all() {
        assert_eq!(upper_bound_search(&[2, 4, 6, 8], 0), 0);
    }

    #[test]
    fn returns_array_length_when_target_equals_last() {
        assert_eq!(upper_bound_search(&[1, 2, 3, 4], 4), 4);
    }

    #[test]
    fn returns_array_length_when_target_exceeds_all() {
        assert_eq!(upper_bound_search(&[1, 2, 3, 4], 99), 4);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(upper_bound_search(&[], 5), 0);
    }

    #[test]
    fn single_element_target_smaller() {
        assert_eq!(upper_bound_search(&[10], 5), 0);
    }

    #[test]
    fn single_element_target_equals() {
        assert_eq!(upper_bound_search(&[10], 10), 1);
    }

    #[test]
    fn single_element_target_larger() {
        assert_eq!(upper_bound_search(&[10], 20), 1);
    }

    #[test]
    fn all_elements_duplicates() {
        assert_eq!(upper_bound_search(&[5, 5, 5, 5, 5], 5), 5);
    }

    #[test]
    fn upper_bound_for_first_element_value() {
        assert_eq!(upper_bound_search(&[1, 3, 5, 7, 9], 1), 1);
    }

    #[test]
    fn upper_bound_for_last_element_value() {
        assert_eq!(upper_bound_search(&[1, 3, 5, 7, 9], 9), 5);
    }

    #[test]
    fn upper_bound_within_range_of_duplicates() {
        assert_eq!(upper_bound_search(&[1, 3, 3, 3, 7], 3), 4);
    }
}
