include!("sources/minimum-window-substring.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_classic_example() {
        assert_eq!(minimum_window_substring("ADOBECODEBANC", "ABC"), "BANC");
    }

    #[test]
    fn test_single_char_match() {
        assert_eq!(minimum_window_substring("a", "a"), "a");
    }

    #[test]
    fn test_needs_more_chars_than_text() {
        assert_eq!(minimum_window_substring("a", "aa"), "");
    }

    #[test]
    fn test_pattern_char_absent() {
        assert_eq!(minimum_window_substring("hello", "z"), "");
    }

    #[test]
    fn test_text_equals_pattern() {
        assert_eq!(minimum_window_substring("abc", "abc"), "abc");
    }

    #[test]
    fn test_text_shorter_than_pattern() {
        assert_eq!(minimum_window_substring("ab", "abc"), "");
    }

    #[test]
    fn test_duplicate_chars_in_pattern() {
        assert_eq!(minimum_window_substring("ADOBECODEBANC", "AABC"), "ADOBECODEBA");
    }

    #[test]
    fn test_minimum_window_multiple_valid() {
        assert_eq!(minimum_window_substring("cabwefgewcwaefgcf", "cae"), "cwae");
    }

    #[test]
    fn test_single_char_pattern_at_end() {
        assert_eq!(minimum_window_substring("abcdef", "f"), "f");
    }

    #[test]
    fn test_empty_pattern() {
        assert_eq!(minimum_window_substring("abc", ""), "");
    }

    #[test]
    fn test_all_same_chars() {
        assert_eq!(minimum_window_substring("aaabbbccc", "b"), "b");
    }

    #[test]
    fn test_window_spans_full_text() {
        assert_eq!(minimum_window_substring("abc", "cba"), "abc");
    }
}
