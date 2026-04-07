include!("string-rotation-check.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_rotation() {
        assert!(string_rotation_check("waterbottle", "erbottlewat"));
    }

    #[test]
    fn test_zero_offset_rotation() {
        assert!(string_rotation_check("hello", "hello"));
    }

    #[test]
    fn test_single_char_match() {
        assert!(string_rotation_check("a", "a"));
    }

    #[test]
    fn test_single_char_no_match() {
        assert!(!string_rotation_check("a", "b"));
    }

    #[test]
    fn test_different_lengths() {
        assert!(!string_rotation_check("abc", "ab"));
    }

    #[test]
    fn test_bottlewater_is_rotation() {
        assert!(string_rotation_check("waterbottle", "bottlewater"));
    }

    #[test]
    fn test_not_a_rotation() {
        assert!(!string_rotation_check("abcde", "abced"));
    }

    #[test]
    fn test_rotation_by_one() {
        assert!(string_rotation_check("abcde", "bcdea"));
    }

    #[test]
    fn test_rotation_from_end() {
        assert!(string_rotation_check("abcde", "eabcd"));
    }

    #[test]
    fn test_two_empty_strings() {
        assert!(string_rotation_check("", ""));
    }

    #[test]
    fn test_one_empty_one_not() {
        assert!(!string_rotation_check("abc", ""));
    }

    #[test]
    fn test_repeated_chars_not_rotation() {
        assert!(!string_rotation_check("aabaa", "baaab"));
    }

    #[test]
    fn test_repeated_chars_valid_rotation() {
        assert!(string_rotation_check("aab", "baa"));
    }
}
