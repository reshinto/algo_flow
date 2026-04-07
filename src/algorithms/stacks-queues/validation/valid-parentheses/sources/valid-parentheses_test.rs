include!("valid-parentheses.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fully_balanced_all_types() {
        assert!(valid_parentheses("({[]})"));
    }

    #[test]
    fn simple_parentheses() {
        assert!(valid_parentheses("()"));
    }

    #[test]
    fn nested_same_type() {
        assert!(valid_parentheses("((()))"));
    }

    #[test]
    fn sequential_pairs() {
        assert!(valid_parentheses("()[]{}"));
    }

    #[test]
    fn mismatched_brackets() {
        assert!(!valid_parentheses("(]"));
    }

    #[test]
    fn wrong_order() {
        assert!(!valid_parentheses("([)]"));
    }

    #[test]
    fn unclosed_open() {
        assert!(!valid_parentheses("("));
    }

    #[test]
    fn lone_close() {
        assert!(!valid_parentheses(")"));
    }

    #[test]
    fn empty_string() {
        assert!(valid_parentheses(""));
    }

    #[test]
    fn unclosed_at_end() {
        assert!(!valid_parentheses("({[]})("));
    }
}
