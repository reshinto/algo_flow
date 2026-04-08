include!("../sources/isomorphic-strings.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_true_for_egg_add() {
        assert!(isomorphic_strings("egg", "add"));
    }

    #[test]
    fn test_returns_false_for_foo_bar() {
        assert!(!isomorphic_strings("foo", "bar"));
    }

    #[test]
    fn test_returns_true_for_paper_title() {
        assert!(isomorphic_strings("paper", "title"));
    }

    #[test]
    fn test_returns_false_for_different_lengths() {
        assert!(!isomorphic_strings("ab", "abc"));
    }

    #[test]
    fn test_returns_true_for_empty_strings() {
        assert!(isomorphic_strings("", ""));
    }

    #[test]
    fn test_returns_true_for_single_character_strings() {
        assert!(isomorphic_strings("a", "b"));
    }

    #[test]
    fn test_returns_false_for_badc_baba() {
        assert!(!isomorphic_strings("badc", "baba"));
    }

    #[test]
    fn test_returns_true_for_identical_strings() {
        assert!(isomorphic_strings("abc", "abc"));
    }
}
