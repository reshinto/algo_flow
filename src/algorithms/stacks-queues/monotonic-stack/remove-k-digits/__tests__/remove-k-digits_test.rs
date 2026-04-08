include!("../sources/remove-k-digits.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn removes_three_digits_from_1432219() {
        assert_eq!(remove_k_digits("1432219", 3), "1219");
    }

    #[test]
    fn removes_one_digit_from_10200() {
        assert_eq!(remove_k_digits("10200", 1), "200");
    }

    #[test]
    fn removes_all_digits_from_10() {
        assert_eq!(remove_k_digits("10", 2), "0");
    }

    #[test]
    fn no_removals_requested() {
        assert_eq!(remove_k_digits("12345", 0), "12345");
    }

    #[test]
    fn strips_leading_zeros_after_removal() {
        assert_eq!(remove_k_digits("100", 1), "0");
    }

    #[test]
    fn single_digit_with_k_one() {
        assert_eq!(remove_k_digits("9", 1), "0");
    }

    #[test]
    fn non_decreasing_sequence_trimmed_from_end() {
        assert_eq!(remove_k_digits("12345", 3), "12");
    }

    #[test]
    fn repeated_digits() {
        assert_eq!(remove_k_digits("1111111", 3), "1111");
    }

    #[test]
    fn decreasing_sequence() {
        assert_eq!(remove_k_digits("9876", 2), "76");
    }

    #[test]
    fn k_equals_string_length() {
        assert_eq!(remove_k_digits("12345", 5), "0");
    }
}
