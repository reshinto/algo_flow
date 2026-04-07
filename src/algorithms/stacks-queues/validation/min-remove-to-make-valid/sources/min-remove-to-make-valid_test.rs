include!("min-remove-to-make-valid.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn already_balanced() {
        assert_eq!(min_remove_to_make_valid("(ab)"), "(ab)");
    }

    #[test]
    fn unmatched_open() {
        assert_eq!(min_remove_to_make_valid("a(b(c)d"), "ab(c)d");
    }

    #[test]
    fn unmatched_close() {
        assert_eq!(min_remove_to_make_valid("a)b"), "ab");
    }

    #[test]
    fn multiple_unmatched_close() {
        assert_eq!(min_remove_to_make_valid("))ab"), "ab");
    }

    #[test]
    fn multiple_unmatched_open() {
        assert_eq!(min_remove_to_make_valid("ab(("), "ab");
    }

    #[test]
    fn leetcode_example() {
        assert_eq!(min_remove_to_make_valid("lee(t(c)o)de)"), "lee(t(c)o)de");
    }

    #[test]
    fn all_unmatched_brackets() {
        assert_eq!(min_remove_to_make_valid(")))"), "");
    }

    #[test]
    fn empty_string() {
        assert_eq!(min_remove_to_make_valid(""), "");
    }

    #[test]
    fn no_parentheses() {
        assert_eq!(min_remove_to_make_valid("abcdef"), "abcdef");
    }

    #[test]
    fn deeply_nested_valid() {
        assert_eq!(min_remove_to_make_valid("((()))"), "((()))");
    }

    #[test]
    fn both_unmatched_open_and_close() {
        assert_eq!(min_remove_to_make_valid(")a(b(c)d("), "ab(c)d");
    }
}
