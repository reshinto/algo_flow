include!("sources/hash-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn finds_value_present_in_array() {
        assert_eq!(hash_search(&[4, 2, 7, 1, 9, 3, 8, 5], 9), 4);
    }

    #[test]
    fn returns_minus_one_when_not_found() {
        assert_eq!(hash_search(&[4, 2, 7, 1, 9, 3, 8, 5], 6), -1);
    }

    #[test]
    fn handles_empty_array() {
        assert_eq!(hash_search(&[], 5), -1);
    }

    #[test]
    fn single_element_found() {
        assert_eq!(hash_search(&[42], 42), 0);
    }

    #[test]
    fn single_element_not_found() {
        assert_eq!(hash_search(&[42], 10), -1);
    }

    #[test]
    fn finds_first_element() {
        assert_eq!(hash_search(&[4, 2, 7, 1, 9, 3, 8, 5], 4), 0);
    }

    #[test]
    fn finds_last_element() {
        assert_eq!(hash_search(&[4, 2, 7, 1, 9, 3, 8, 5], 5), 7);
    }

    #[test]
    fn finds_middle_element() {
        assert_eq!(hash_search(&[10, 20, 30, 40, 50], 30), 2);
    }

    #[test]
    fn returns_minus_one_for_value_not_in_array() {
        assert_eq!(hash_search(&[5, 10, 15, 20], 1), -1);
    }

    #[test]
    fn handles_negative_numbers() {
        assert_eq!(hash_search(&[-10, -5, 0, 3, 7], -5), 1);
    }

    #[test]
    fn works_on_unsorted_array() {
        assert_eq!(hash_search(&[9, 3, 1, 7, 2, 5], 7), 3);
    }
}
