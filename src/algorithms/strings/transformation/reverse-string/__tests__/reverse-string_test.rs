include!("../sources/reverse-string.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_standard_word() {
        assert_eq!(reverse_string("hello"), "olleh");
    }

    #[test]
    fn test_single_char() {
        assert_eq!(reverse_string("a"), "a");
    }

    #[test]
    fn test_empty_string() {
        assert_eq!(reverse_string(""), "");
    }

    #[test]
    fn test_two_chars() {
        assert_eq!(reverse_string("ab"), "ba");
    }

    #[test]
    fn test_palindrome() {
        assert_eq!(reverse_string("racecar"), "racecar");
    }

    #[test]
    fn test_with_spaces() {
        assert_eq!(reverse_string("hello world"), "dlrow olleh");
    }

    #[test]
    fn test_repeated_chars() {
        assert_eq!(reverse_string("aaaa"), "aaaa");
    }

    #[test]
    fn test_longer_word() {
        assert_eq!(reverse_string("algorithm"), "mhtirogla");
    }
}
