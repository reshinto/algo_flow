include!("../sources/rabin-karp-search.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pattern_at_start() {
        assert_eq!(rabin_karp_search("ABCDEF", "ABC"), 0);
    }

    #[test]
    fn test_pattern_in_middle() {
        assert_eq!(rabin_karp_search("GEEKS FOR GEEKS", "GEEK"), 0);
    }

    #[test]
    fn test_pattern_at_end() {
        assert_eq!(rabin_karp_search("XYZABC", "ABC"), 3);
    }

    #[test]
    fn test_pattern_not_found() {
        assert_eq!(rabin_karp_search("ABCDEFG", "XYZ"), -1);
    }

    #[test]
    fn test_single_char_found() {
        assert_eq!(rabin_karp_search("HELLO", "L"), 2);
    }

    #[test]
    fn test_single_char_not_found() {
        assert_eq!(rabin_karp_search("HELLO", "Z"), -1);
    }

    #[test]
    fn test_empty_pattern() {
        assert_eq!(rabin_karp_search("HELLO", ""), 0);
    }

    #[test]
    fn test_text_equals_pattern() {
        assert_eq!(rabin_karp_search("ABCD", "ABCD"), 0);
    }

    #[test]
    fn test_pattern_longer_than_text() {
        assert_eq!(rabin_karp_search("AB", "ABCD"), -1);
    }

    #[test]
    fn test_repeated_characters() {
        assert_eq!(rabin_karp_search("AAAAAB", "AAAB"), 2);
    }

    #[test]
    fn test_full_text_pattern() {
        assert_eq!(rabin_karp_search("ABABCABAB", "ABABCABAB"), 0);
    }

    #[test]
    fn test_for_in_geeks() {
        assert_eq!(rabin_karp_search("GEEKS FOR GEEKS", "FOR"), 6);
    }
}
