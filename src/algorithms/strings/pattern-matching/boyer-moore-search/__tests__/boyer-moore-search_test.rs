include!("../sources/boyer-moore-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pattern_at_start() {
        assert_eq!(boyer_moore_search("ABCDEF", "ABC"), 0);
    }

    #[test]
    fn test_pattern_in_middle() {
        assert_eq!(boyer_moore_search("ABAAABCD", "ABC"), 4);
    }

    #[test]
    fn test_pattern_at_end() {
        assert_eq!(boyer_moore_search("XYZABC", "ABC"), 3);
    }

    #[test]
    fn test_pattern_not_found() {
        assert_eq!(boyer_moore_search("ABCDEFG", "XYZ"), -1);
    }

    #[test]
    fn test_single_char_found() {
        assert_eq!(boyer_moore_search("HELLO", "L"), 2);
    }

    #[test]
    fn test_single_char_not_found() {
        assert_eq!(boyer_moore_search("HELLO", "Z"), -1);
    }

    #[test]
    fn test_empty_pattern() {
        assert_eq!(boyer_moore_search("HELLO", ""), 0);
    }

    #[test]
    fn test_text_equals_pattern() {
        assert_eq!(boyer_moore_search("ABCD", "ABCD"), 0);
    }

    #[test]
    fn test_pattern_longer_than_text() {
        assert_eq!(boyer_moore_search("AB", "ABCD"), -1);
    }

    #[test]
    fn test_repeated_chars() {
        assert_eq!(boyer_moore_search("AAAAABCD", "ABCD"), 4);
    }

    #[test]
    fn test_multiple_shifts() {
        assert_eq!(boyer_moore_search("GCATCGCAGAGAGTATACAGTACG", "GCAGAGAG"), 5);
    }

    #[test]
    fn test_no_repeated_chars() {
        assert_eq!(boyer_moore_search("ABCDEFGHIJK", "DEF"), 3);
    }
}
