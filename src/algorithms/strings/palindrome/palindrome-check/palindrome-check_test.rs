include!("sources/palindrome-check.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_racecar() {
        assert!(palindrome_check("racecar"));
    }

    #[test]
    fn test_hello_false() {
        assert!(!palindrome_check("hello"));
    }

    #[test]
    fn test_single_char() {
        assert!(palindrome_check("a"));
    }

    #[test]
    fn test_empty_string() {
        assert!(palindrome_check(""));
    }

    #[test]
    fn test_two_char_non_palindrome() {
        assert!(!palindrome_check("ab"));
    }

    #[test]
    fn test_odd_length_palindrome() {
        assert!(palindrome_check("aba"));
    }

    #[test]
    fn test_even_length_palindrome() {
        assert!(palindrome_check("abba"));
    }

    #[test]
    fn test_first_last_differ() {
        assert!(!palindrome_check("abca"));
    }

    #[test]
    fn test_all_same_chars() {
        assert!(palindrome_check("aaaa"));
    }
}
