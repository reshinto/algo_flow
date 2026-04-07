include!("linear-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_value_present_in_array() {
        assert_eq!(linear_search(&[4, 2, 7, 1, 9, 3, 8, 5], 9), 4);
    }

    #[test]
    fn returns_minus_one_when_not_found() {
        assert_eq!(linear_search(&[4, 2, 7, 1, 9, 3, 8, 5], 6), -1);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(linear_search(&[], 5), -1);
    }

    #[test]
    fn single_element_found() {
        assert_eq!(linear_search(&[42], 42), 0);
    }

    #[test]
    fn single_element_not_found() {
        assert_eq!(linear_search(&[42], 10), -1);
    }

    #[test]
    fn finds_first_element() {
        assert_eq!(linear_search(&[4, 2, 7, 1, 9, 3, 8, 5], 4), 0);
    }

    #[test]
    fn finds_last_element() {
        assert_eq!(linear_search(&[4, 2, 7, 1, 9, 3, 8, 5], 5), 7);
    }

    #[test]
    fn returns_first_occurrence_for_duplicates() {
        assert_eq!(linear_search(&[3, 1, 3, 5, 3], 3), 0);
    }

    #[test]
    fn handles_negative_numbers() {
        assert_eq!(linear_search(&[-5, -3, 0, 2, 4], -3), 1);
    }

    #[test]
    fn works_on_unsorted_array() {
        assert_eq!(linear_search(&[9, 3, 1, 7, 2, 5], 7), 3);
    }
}
