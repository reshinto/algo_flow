include!("z-algorithm.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pattern_at_start() {
        assert_eq!(z_algorithm("ABCDEF", "ABC"), 0);
    }

    #[test]
    fn test_pattern_in_middle() {
        assert_eq!(z_algorithm("AABXAABXCAABXAABXAY", "AABXAAB"), 0);
    }

    #[test]
    fn test_pattern_near_end() {
        assert_eq!(z_algorithm("XYZAABXAAB", "AABXAAB"), 3);
    }

    #[test]
    fn test_pattern_at_end() {
        assert_eq!(z_algorithm("XYZABC", "ABC"), 3);
    }

    #[test]
    fn test_pattern_not_found() {
        assert_eq!(z_algorithm("ABCDEFG", "XYZ"), -1);
    }

    #[test]
    fn test_single_char_found() {
        assert_eq!(z_algorithm("HELLO", "L"), 2);
    }

    #[test]
    fn test_single_char_not_found() {
        assert_eq!(z_algorithm("HELLO", "Z"), -1);
    }

    #[test]
    fn test_empty_pattern() {
        assert_eq!(z_algorithm("HELLO", ""), 0);
    }

    #[test]
    fn test_text_equals_pattern() {
        assert_eq!(z_algorithm("ABCD", "ABCD"), 0);
    }

    #[test]
    fn test_pattern_longer_than_text() {
        assert_eq!(z_algorithm("AB", "ABCD"), -1);
    }

    #[test]
    fn test_repeated_characters() {
        assert_eq!(z_algorithm("AAAAAB", "AAAB"), 2);
    }

    #[test]
    fn test_first_of_multiple() {
        assert_eq!(z_algorithm("ABABABAB", "ABAB"), 0);
    }
}
