include!("../sources/longest-valid-parentheses.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn returns_2_for_double_open_close() {
        assert_eq!(longest_valid_parentheses("(()"), 2);
    }

    #[test]
    fn returns_4_for_interleaved() {
        assert_eq!(longest_valid_parentheses(")()())"), 4);
    }

    #[test]
    fn empty_string() {
        assert_eq!(longest_valid_parentheses(""), 0);
    }

    #[test]
    fn returns_6_for_nested() {
        assert_eq!(longest_valid_parentheses("(()())"), 6);
    }

    #[test]
    fn returns_4_for_two_pairs() {
        assert_eq!(longest_valid_parentheses("()()"), 4);
    }

    #[test]
    fn returns_0_for_all_open() {
        assert_eq!(longest_valid_parentheses("((("), 0);
    }
}
