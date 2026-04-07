include!("string-compression.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compresses_repeated() {
        assert_eq!(string_compression("aabcccccaaa"), "a2b1c5a3");
    }

    #[test]
    fn test_returns_original_if_not_shorter() {
        assert_eq!(string_compression("abc"), "abc");
    }

    #[test]
    fn test_empty_string() {
        assert_eq!(string_compression(""), "");
    }

    #[test]
    fn test_single_char() {
        assert_eq!(string_compression("a"), "a");
    }

    #[test]
    fn test_two_identical_chars_same_length() {
        assert_eq!(string_compression("aa"), "aa");
    }

    #[test]
    fn test_long_run() {
        assert_eq!(string_compression("aaaaaaa"), "a7");
    }

    #[test]
    fn test_alternating_segments() {
        assert_eq!(string_compression("aaabbbccc"), "a3b3c3");
    }

    #[test]
    fn test_no_runs() {
        assert_eq!(string_compression("abcd"), "abcd");
    }

    #[test]
    fn test_long_run_then_short() {
        assert_eq!(string_compression("aaaaab"), "a5b1");
    }

    #[test]
    fn test_two_distinct_runs() {
        assert_eq!(string_compression("aaabbb"), "a3b3");
    }

    #[test]
    fn test_single_then_long_run() {
        assert_eq!(string_compression("abbbbb"), "a1b5");
    }

    #[test]
    fn test_digits() {
        assert_eq!(string_compression("1111222"), "1423");
    }
}
