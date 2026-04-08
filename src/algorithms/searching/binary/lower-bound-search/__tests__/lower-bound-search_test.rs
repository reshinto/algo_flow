include!("../sources/lower-bound-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_first_occurrence_of_repeated_value() {
        assert_eq!(lower_bound_search(&[1, 3, 3, 5, 5, 5, 8, 12], 5), 3);
    }

    #[test]
    fn finds_exact_position_when_value_exists_once() {
        assert_eq!(lower_bound_search(&[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23), 5);
    }

    #[test]
    fn returns_array_length_when_value_larger_than_all() {
        assert_eq!(lower_bound_search(&[1, 3, 5, 7, 9], 10), 5);
    }

    #[test]
    fn returns_zero_when_value_smaller_than_first() {
        assert_eq!(lower_bound_search(&[5, 10, 15, 20], 3), 0);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(lower_bound_search(&[], 5), 0);
    }

    #[test]
    fn single_element_found() {
        assert_eq!(lower_bound_search(&[42], 42), 0);
    }

    #[test]
    fn single_element_target_larger() {
        assert_eq!(lower_bound_search(&[42], 100), 1);
    }

    #[test]
    fn returns_zero_for_target_smaller_than_first() {
        assert_eq!(lower_bound_search(&[5, 10, 15, 20], 1), 0);
    }

    #[test]
    fn finds_insertion_point_between_elements() {
        assert_eq!(lower_bound_search(&[2, 5, 8, 12, 16], 6), 2);
    }

    #[test]
    fn handles_all_duplicate_array() {
        assert_eq!(lower_bound_search(&[5, 5, 5, 5, 5], 5), 0);
    }

    #[test]
    fn returns_array_length_for_larger_target_in_duplicate_array() {
        assert_eq!(lower_bound_search(&[5, 5, 5, 5, 5], 6), 5);
    }

    #[test]
    fn finds_first_occurrence_at_array_start() {
        assert_eq!(lower_bound_search(&[3, 3, 3, 5, 7], 3), 0);
    }
}
