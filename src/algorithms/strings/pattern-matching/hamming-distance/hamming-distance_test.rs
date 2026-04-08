include!("sources/hamming-distance.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_karolin_kathrin() {
        assert_eq!(hamming_distance("karolin", "kathrin"), 3);
    }

    #[test]
    fn test_identical_strings() {
        assert_eq!(hamming_distance("abcdef", "abcdef"), 0);
    }

    #[test]
    fn test_all_chars_differ() {
        assert_eq!(hamming_distance("aaaa", "bbbb"), 4);
    }

    #[test]
    fn test_single_char_difference() {
        assert_eq!(hamming_distance("hello", "hxllo"), 1);
    }

    #[test]
    fn test_different_lengths() {
        assert_eq!(hamming_distance("abc", "abcd"), -1);
    }

    #[test]
    fn test_text_longer_than_pattern() {
        assert_eq!(hamming_distance("abcde", "abc"), -1);
    }

    #[test]
    fn test_single_char_match() {
        assert_eq!(hamming_distance("a", "a"), 0);
    }

    #[test]
    fn test_single_char_differ() {
        assert_eq!(hamming_distance("a", "b"), 1);
    }

    #[test]
    fn test_two_empty_strings() {
        assert_eq!(hamming_distance("", ""), 0);
    }

    #[test]
    fn test_binary_string_pair() {
        assert_eq!(hamming_distance("1011101", "1001001"), 2);
    }

    #[test]
    fn test_uppercase_comparison() {
        assert_eq!(hamming_distance("TONED", "ROSES"), 3);
    }
}
