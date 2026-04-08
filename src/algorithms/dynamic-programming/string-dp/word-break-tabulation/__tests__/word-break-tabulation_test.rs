include!("../sources/word-break-tabulation.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn leetcode_returns_true() {
        assert!(word_break_tabulation("leetcode", &["leet", "code"]));
    }

    #[test]
    fn applepenapple_returns_true() {
        assert!(word_break_tabulation("applepenapple", &["apple", "pen"]));
    }

    #[test]
    fn catsandog_returns_false() {
        assert!(!word_break_tabulation("catsandog", &["cats", "dog", "sand", "and", "cat"]));
    }

    #[test]
    fn empty_string_returns_true() {
        assert!(word_break_tabulation("", &["a"]));
    }

    #[test]
    fn catsanddog_returns_true() {
        assert!(word_break_tabulation("catsanddog", &["cats", "dog", "sand", "and", "cat"]));
    }

    #[test]
    fn no_match_returns_false() {
        assert!(!word_break_tabulation("hello", &["world", "foo"]));
    }

    #[test]
    fn exact_match_returns_true() {
        assert!(word_break_tabulation("apple", &["apple", "pen"]));
    }

    #[test]
    fn leftover_returns_false() {
        assert!(!word_break_tabulation("leetcoderr", &["leet", "code"]));
    }
}
