include!("sources/backspace-string-compare.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn both_resolve_to_same() {
        assert!(backspace_string_compare("ab#c", "ad#c"));
    }

    #[test]
    fn both_fully_erased() {
        assert!(backspace_string_compare("ab##", "c#d#"));
    }

    #[test]
    fn different_after_processing() {
        assert!(!backspace_string_compare("a#c", "b"));
    }

    #[test]
    fn both_empty() {
        assert!(backspace_string_compare("", ""));
    }

    #[test]
    fn identical_no_backspaces() {
        assert!(backspace_string_compare("a", "a"));
    }

    #[test]
    fn different_lengths() {
        assert!(!backspace_string_compare("abc", "a"));
    }

    #[test]
    fn backspace_on_empty_stack() {
        assert!(backspace_string_compare("#a", "a"));
    }

    #[test]
    fn multiple_backspaces_same_result() {
        assert!(backspace_string_compare("nzp#o#g", "b#nzp#o#g"));
    }
}
