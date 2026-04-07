include!("longest-common-substring.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ababc_babcba() {
        assert_eq!(longest_common_substring("ABABC", "BABCBA"), 4);
    }

    #[test]
    fn test_source_empty() {
        assert_eq!(longest_common_substring("", "abc"), 0);
    }

    #[test]
    fn test_target_empty() {
        assert_eq!(longest_common_substring("abc", ""), 0);
    }

    #[test]
    fn test_two_empty_strings() {
        assert_eq!(longest_common_substring("", ""), 0);
    }

    #[test]
    fn test_identical_strings() {
        assert_eq!(longest_common_substring("abc", "abc"), 3);
    }

    #[test]
    fn test_completely_different() {
        assert_eq!(longest_common_substring("abc", "xyz"), 0);
    }

    #[test]
    fn test_single_matching_char() {
        assert_eq!(longest_common_substring("abc", "xbz"), 1);
    }

    #[test]
    fn test_single_char_match() {
        assert_eq!(longest_common_substring("a", "a"), 1);
    }

    #[test]
    fn test_single_char_differ() {
        assert_eq!(longest_common_substring("a", "b"), 0);
    }

    #[test]
    fn test_substring_at_beginning() {
        assert_eq!(longest_common_substring("abcdef", "abcxyz"), 3);
    }

    #[test]
    fn test_substring_at_end() {
        assert_eq!(longest_common_substring("xyzabc", "defabc"), 3);
    }

    #[test]
    fn test_multiple_substrings_pick_longest() {
        assert_eq!(longest_common_substring("abXYZcd", "abXYcd"), 4);
    }

    #[test]
    fn test_repeated_characters() {
        assert_eq!(longest_common_substring("aaaa", "aa"), 2);
    }
}
