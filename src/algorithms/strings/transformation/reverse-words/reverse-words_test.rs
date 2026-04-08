include!("sources/reverse-words.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_the_sky_is_blue() {
        assert_eq!(reverse_words("the sky is blue"), "blue is sky the");
    }

    #[test]
    fn test_leading_trailing_spaces() {
        assert_eq!(reverse_words("  hello world  "), "world hello");
    }

    #[test]
    fn test_multiple_spaces() {
        assert_eq!(reverse_words("a   good   example"), "example good a");
    }

    #[test]
    fn test_single_word() {
        assert_eq!(reverse_words("hello"), "hello");
    }

    #[test]
    fn test_single_word_with_spaces() {
        assert_eq!(reverse_words("   spaces   "), "spaces");
    }

    #[test]
    fn test_two_words() {
        assert_eq!(reverse_words("foo bar"), "bar foo");
    }

    #[test]
    fn test_three_words() {
        assert_eq!(reverse_words("one two three"), "three two one");
    }

    #[test]
    fn test_longer_sentence() {
        assert_eq!(reverse_words("let us practice"), "practice us let");
    }

    #[test]
    fn test_leading_spaces_only() {
        assert_eq!(reverse_words("   word"), "word");
    }

    #[test]
    fn test_trailing_spaces_only() {
        assert_eq!(reverse_words("word   "), "word");
    }
}
