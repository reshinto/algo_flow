include!("sources/ransom-note.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_true_when_magazine_has_exact_chars() {
        assert!(ransom_note("aa", "aab"));
    }

    #[test]
    fn test_returns_false_when_magazine_lacks_required_char() {
        assert!(!ransom_note("a", "b"));
    }

    #[test]
    fn test_returns_false_when_not_enough_copies() {
        assert!(!ransom_note("aa", "ab"));
    }

    #[test]
    fn test_returns_true_when_ransom_note_is_empty() {
        assert!(ransom_note("", "abc"));
    }

    #[test]
    fn test_returns_true_when_both_empty() {
        assert!(ransom_note("", ""));
    }

    #[test]
    fn test_returns_false_when_note_nonempty_magazine_empty() {
        assert!(!ransom_note("a", ""));
    }

    #[test]
    fn test_returns_true_with_extra_magazine_chars() {
        assert!(ransom_note("abc", "aabbcc"));
    }

    #[test]
    fn test_returns_false_for_char_not_in_magazine() {
        assert!(!ransom_note("z", "abcde"));
    }

    #[test]
    fn test_returns_true_for_single_matching_char() {
        assert!(ransom_note("x", "x"));
    }

    #[test]
    fn test_handles_repeated_chars_exact_count() {
        assert!(ransom_note("aaa", "aaab"));
        assert!(!ransom_note("aaaa", "aaab"));
    }
}
