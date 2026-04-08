include!("sources/find-missing-number.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_case() {
        assert_eq!(find_missing_number(&[3, 0, 1]), 2);
    }

    #[test]
    fn test_missing_zero() {
        assert_eq!(find_missing_number(&[1, 2, 3]), 0);
    }

    #[test]
    fn test_missing_n() {
        assert_eq!(find_missing_number(&[0, 1, 2]), 3);
    }

    #[test]
    fn test_single_element_zero() {
        assert_eq!(find_missing_number(&[0]), 1);
    }

    #[test]
    fn test_single_element_one() {
        assert_eq!(find_missing_number(&[1]), 0);
    }

    #[test]
    fn test_empty_array() {
        assert_eq!(find_missing_number(&[]), 0);
    }

    #[test]
    fn test_missing_four() {
        assert_eq!(find_missing_number(&[0, 1, 2, 3, 5, 6, 7, 8, 9]), 4);
    }

    #[test]
    fn test_unsorted_missing_two() {
        assert_eq!(find_missing_number(&[0, 1, 3, 4, 5, 6, 7]), 2);
    }
}
