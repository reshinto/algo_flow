include!("sources/naive-pattern-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pattern_at_start() {
        assert_eq!(naive_pattern_search("ABCDEF", "ABC"), 0);
    }

    #[test]
    fn test_pattern_in_middle() {
        assert_eq!(naive_pattern_search("AABAACAADAABAABA", "AABA"), 0);
    }

    #[test]
    fn test_pattern_at_end() {
        assert_eq!(naive_pattern_search("XYZABC", "ABC"), 3);
    }

    #[test]
    fn test_pattern_not_found() {
        assert_eq!(naive_pattern_search("ABCDEFG", "XYZ"), -1);
    }

    #[test]
    fn test_single_char_found() {
        assert_eq!(naive_pattern_search("HELLO", "L"), 2);
    }

    #[test]
    fn test_single_char_not_found() {
        assert_eq!(naive_pattern_search("HELLO", "Z"), -1);
    }

    #[test]
    fn test_empty_pattern() {
        assert_eq!(naive_pattern_search("HELLO", ""), 0);
    }

    #[test]
    fn test_text_equals_pattern() {
        assert_eq!(naive_pattern_search("ABCD", "ABCD"), 0);
    }

    #[test]
    fn test_pattern_longer_than_text() {
        assert_eq!(naive_pattern_search("AB", "ABCD"), -1);
    }

    #[test]
    fn test_repeated_characters() {
        assert_eq!(naive_pattern_search("AAAAAB", "AAAB"), 2);
    }

    #[test]
    fn test_worst_case_repetitive() {
        assert_eq!(naive_pattern_search("AAAAAAB", "AAAAB"), 2);
    }
}
