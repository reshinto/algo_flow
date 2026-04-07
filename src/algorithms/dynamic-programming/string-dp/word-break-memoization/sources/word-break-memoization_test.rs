include!("word-break-memoization.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn leetcode_returns_true() {
        assert!(word_break_memoization("leetcode", &["leet", "code"]));
    }

    #[test]
    fn catsandog_returns_false() {
        assert!(!word_break_memoization("catsandog", &["cats", "dog", "sand", "and", "cat"]));
    }

    #[test]
    fn empty_string_returns_true() {
        assert!(word_break_memoization("", &["leet", "code"]));
    }

    #[test]
    fn exact_match_returns_true() {
        assert!(word_break_memoization("leet", &["leet", "code"]));
    }

    #[test]
    fn no_match_returns_false() {
        assert!(!word_break_memoization("abcd", &["leet", "code"]));
    }

    #[test]
    fn applepenapple_returns_true() {
        assert!(word_break_memoization("applepenapple", &["apple", "pen"]));
    }

    #[test]
    fn catsanddog_returns_true() {
        assert!(word_break_memoization("catsanddog", &["cat", "cats", "and", "sand", "dog"]));
    }

    #[test]
    fn aaaaab_returns_false() {
        assert!(!word_break_memoization("aaaaab", &["a", "aa", "aaa", "aaaa"]));
    }
}
