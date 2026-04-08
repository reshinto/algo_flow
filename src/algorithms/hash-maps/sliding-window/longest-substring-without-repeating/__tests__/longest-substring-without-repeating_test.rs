include!("../sources/longest-substring-without-repeating.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_3_for_abcabcbb() {
        assert_eq!(longest_substring_without_repeating("abcabcbb"), 3);
    }

    #[test]
    fn test_returns_1_for_bbbbb() {
        assert_eq!(longest_substring_without_repeating("bbbbb"), 1);
    }

    #[test]
    fn test_returns_3_for_pwwkew() {
        assert_eq!(longest_substring_without_repeating("pwwkew"), 3);
    }

    #[test]
    fn test_returns_0_for_empty_string() {
        assert_eq!(longest_substring_without_repeating(""), 0);
    }

    #[test]
    fn test_returns_1_for_single_char() {
        assert_eq!(longest_substring_without_repeating("a"), 1);
    }

    #[test]
    fn test_returns_5_for_abcde() {
        assert_eq!(longest_substring_without_repeating("abcde"), 5);
    }

    #[test]
    fn test_returns_2_for_abba() {
        assert_eq!(longest_substring_without_repeating("abba"), 2);
    }

    #[test]
    fn test_returns_3_for_dvdf() {
        assert_eq!(longest_substring_without_repeating("dvdf"), 3);
    }
}
