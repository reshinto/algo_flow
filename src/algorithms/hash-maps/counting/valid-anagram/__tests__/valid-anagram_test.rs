include!("../sources/valid-anagram.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_true_for_anagram_nagaram() {
        assert!(valid_anagram("anagram", "nagaram"));
    }

    #[test]
    fn test_returns_false_for_rat_car() {
        assert!(!valid_anagram("rat", "car"));
    }

    #[test]
    fn test_returns_false_for_different_lengths() {
        assert!(!valid_anagram("ab", "abc"));
    }

    #[test]
    fn test_returns_true_for_identical_single_chars() {
        assert!(valid_anagram("a", "a"));
    }

    #[test]
    fn test_returns_false_for_different_single_chars() {
        assert!(!valid_anagram("a", "b"));
    }

    #[test]
    fn test_returns_true_for_empty_strings() {
        assert!(valid_anagram("", ""));
    }

    #[test]
    fn test_returns_true_for_identical_strings() {
        assert!(valid_anagram("listen", "listen"));
    }

    #[test]
    fn test_returns_true_for_listen_silent() {
        assert!(valid_anagram("listen", "silent"));
    }

    #[test]
    fn test_returns_false_when_extra_repeated_char() {
        assert!(!valid_anagram("aab", "aaa"));
    }

    #[test]
    fn test_is_case_sensitive() {
        assert!(!valid_anagram("Aa", "aa"));
    }
}
