include!("sources/run-length-decoding.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_default_example() {
        assert_eq!(run_length_decoding("3a2b4c"), "aaabbcccc");
    }

    #[test]
    fn test_all_single_count() {
        assert_eq!(run_length_decoding("1a1b1c"), "abc");
    }

    #[test]
    fn test_empty_string() {
        assert_eq!(run_length_decoding(""), "");
    }

    #[test]
    fn test_single_group_one_char() {
        assert_eq!(run_length_decoding("1z"), "z");
    }

    #[test]
    fn test_single_group_many_chars() {
        assert_eq!(run_length_decoding("5x"), "xxxxx");
    }

    #[test]
    fn test_mixed_count_groups() {
        assert_eq!(run_length_decoding("2a3b1c"), "aabbbc");
    }

    #[test]
    fn test_multi_digit_count() {
        assert_eq!(run_length_decoding("10a"), "aaaaaaaaaa");
    }

    #[test]
    fn test_two_identical_groups() {
        assert_eq!(run_length_decoding("2a2a"), "aaaa");
    }

    #[test]
    fn test_uppercase_letters() {
        assert_eq!(run_length_decoding("3A2B"), "AAABB");
    }
}
