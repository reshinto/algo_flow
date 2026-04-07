include!("longest-palindromic-substring.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_babad() {
        let result = longest_palindromic_substring("babad");
        assert!(result == "bab" || result == "aba", "Got: {}", result);
    }

    #[test]
    fn test_cbbd() {
        assert_eq!(longest_palindromic_substring("cbbd"), "bb");
    }

    #[test]
    fn test_single_char() {
        assert_eq!(longest_palindromic_substring("a"), "a");
    }

    #[test]
    fn test_empty_string() {
        assert_eq!(longest_palindromic_substring(""), "");
    }

    #[test]
    fn test_full_palindrome() {
        assert_eq!(longest_palindromic_substring("racecar"), "racecar");
    }

    #[test]
    fn test_even_length_palindrome() {
        assert_eq!(longest_palindromic_substring("abba"), "abba");
    }

    #[test]
    fn test_all_same_chars() {
        assert_eq!(longest_palindromic_substring("aaaa"), "aaaa");
    }

    #[test]
    fn test_all_unique_chars() {
        let result = longest_palindromic_substring("abcde");
        assert_eq!(result.len(), 1);
    }

    #[test]
    fn test_embedded_palindrome() {
        assert_eq!(longest_palindromic_substring("xyzracecarabc"), "racecar");
    }

    #[test]
    fn test_even_palindrome_embedded() {
        assert_eq!(longest_palindromic_substring("xyzabbadef"), "abba");
    }

    #[test]
    fn test_two_char_palindrome() {
        assert_eq!(longest_palindromic_substring("aa"), "aa");
    }

    #[test]
    fn test_two_char_non_palindrome() {
        let result = longest_palindromic_substring("ab");
        assert_eq!(result.len(), 1);
    }
}
