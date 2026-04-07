include!("wildcard-matching.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_adceb_star_a_star_b() {
        assert!(wildcard_matching("adceb", "*a*b"));
    }

    #[test]
    fn test_aa_a_false() {
        assert!(!wildcard_matching("aa", "a"));
    }

    #[test]
    fn test_aa_star() {
        assert!(wildcard_matching("aa", "*"));
    }

    #[test]
    fn test_empty_matches_empty() {
        assert!(wildcard_matching("", ""));
    }

    #[test]
    fn test_abc_a_question_c() {
        assert!(wildcard_matching("abc", "a?c"));
    }

    #[test]
    fn test_abc_a_question_b_false() {
        assert!(!wildcard_matching("abc", "a?b"));
    }

    #[test]
    fn test_any_string_star() {
        assert!(wildcard_matching("anylongstring", "*"));
    }

    #[test]
    fn test_empty_triple_star() {
        assert!(wildcard_matching("", "***"));
    }

    #[test]
    fn test_cb_question_a_false() {
        assert!(!wildcard_matching("cb", "?a"));
    }

    #[test]
    fn test_adceb_star_a_star() {
        assert!(wildcard_matching("adceb", "*a*"));
    }

    #[test]
    fn test_empty_a_false() {
        assert!(!wildcard_matching("", "a"));
    }

    #[test]
    fn test_abc_star_bc() {
        assert!(wildcard_matching("abc", "*bc"));
    }

    #[test]
    fn test_abc_abc() {
        assert!(wildcard_matching("abc", "abc"));
    }

    #[test]
    fn test_abc_abcd_false() {
        assert!(!wildcard_matching("abc", "abcd"));
    }

    #[test]
    fn test_single_char_question() {
        assert!(wildcard_matching("a", "?"));
    }
}
