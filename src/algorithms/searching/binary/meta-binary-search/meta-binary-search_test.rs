include!("sources/meta-binary-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_value_present_in_array() {
        assert_eq!(meta_binary_search(&[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 23), 5);
    }

    #[test]
    fn returns_minus_one_when_not_found() {
        assert_eq!(meta_binary_search(&[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 50), -1);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(meta_binary_search(&[], 5), -1);
    }

    #[test]
    fn single_element_found() {
        assert_eq!(meta_binary_search(&[42], 42), 0);
    }

    #[test]
    fn single_element_not_found() {
        assert_eq!(meta_binary_search(&[42], 10), -1);
    }

    #[test]
    fn finds_first_element() {
        assert_eq!(meta_binary_search(&[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 2), 0);
    }

    #[test]
    fn finds_last_element() {
        assert_eq!(meta_binary_search(&[2, 5, 8, 12, 16, 23, 38, 56, 72, 91], 91), 9);
    }

    #[test]
    fn finds_middle_element() {
        assert_eq!(meta_binary_search(&[10, 20, 30, 40, 50], 30), 2);
    }

    #[test]
    fn returns_minus_one_for_value_smaller_than_all() {
        assert_eq!(meta_binary_search(&[5, 10, 15, 20], 1), -1);
    }

    #[test]
    fn returns_minus_one_for_value_larger_than_all() {
        assert_eq!(meta_binary_search(&[5, 10, 15, 20], 100), -1);
    }

    #[test]
    fn finds_element_in_two_element_array() {
        assert_eq!(meta_binary_search(&[3, 7], 7), 1);
    }

    #[test]
    fn handles_power_of_two_length_array() {
        assert_eq!(meta_binary_search(&[1, 3, 5, 7, 9, 11, 13, 15], 9), 4);
    }
}
