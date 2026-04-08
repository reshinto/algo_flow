include!("../sources/longest-repeated-substring.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_banana() {
        assert_eq!(longest_repeated_substring("banana"), "ana");
    }

    #[test]
    fn test_no_repeat() {
        assert_eq!(longest_repeated_substring("abcd"), "");
    }

    #[test]
    fn test_aab() {
        assert_eq!(longest_repeated_substring("aab"), "a");
    }

    #[test]
    fn test_single_char() {
        assert_eq!(longest_repeated_substring("a"), "");
    }

    #[test]
    fn test_empty_string() {
        assert_eq!(longest_repeated_substring(""), "");
    }

    #[test]
    fn test_ababc() {
        assert_eq!(longest_repeated_substring("ababc"), "ab");
    }

    #[test]
    fn test_all_same() {
        let result = longest_repeated_substring("aaa");
        assert!(!result.is_empty());
        assert!("aaa".contains(&result as &str));
    }

    #[test]
    fn test_two_identical_chars() {
        assert_eq!(longest_repeated_substring("aa"), "a");
    }

    #[test]
    fn test_two_different_chars() {
        assert_eq!(longest_repeated_substring("ab"), "");
    }

    #[test]
    fn test_abcabc() {
        assert_eq!(longest_repeated_substring("abcabc"), "abc");
    }

    #[test]
    fn test_mississippi() {
        let result = longest_repeated_substring("mississippi");
        assert!(!result.is_empty());
        let haystack = "mississippi";
        let first = haystack.find(&result as &str).unwrap();
        let second = haystack[first + 1..].find(&result as &str);
        assert!(second.is_some(), "Expected repeated occurrence in 'mississippi'");
    }

    #[test]
    fn test_numeric_like() {
        assert_eq!(longest_repeated_substring("121212"), "1212");
    }
}
