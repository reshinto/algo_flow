include!("regex-matching.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_aab_c_star_a_star_b() {
        assert!(regex_matching("aab", "c*a*b"));
    }

    #[test]
    fn test_aa_a_false() {
        assert!(!regex_matching("aa", "a"));
    }

    #[test]
    fn test_ab_dot_star() {
        assert!(regex_matching("ab", ".*"));
    }

    #[test]
    fn test_empty_matches_empty() {
        assert!(regex_matching("", ""));
    }

    #[test]
    fn test_aa_a_star() {
        assert!(regex_matching("aa", "a*"));
    }

    #[test]
    fn test_aa_dot_star() {
        assert!(regex_matching("aa", ".*"));
    }

    #[test]
    fn test_aab_c_star_a_star_false() {
        assert!(!regex_matching("aab", "c*a*"));
    }

    #[test]
    fn test_mississippi() {
        assert!(!regex_matching("mississippi", "mis*is*p*."));
    }

    #[test]
    fn test_ab_dot_star_c_false() {
        assert!(!regex_matching("ab", ".*c"));
    }

    #[test]
    fn test_a_dot() {
        assert!(regex_matching("a", "."));
    }

    #[test]
    fn test_b_a_false() {
        assert!(!regex_matching("b", "a"));
    }

    #[test]
    fn test_empty_a_star() {
        assert!(regex_matching("", "a*"));
    }

    #[test]
    fn test_aaa_a_star_a() {
        assert!(regex_matching("aaa", "a*a"));
    }

    #[test]
    fn test_abc_a_dot_c() {
        assert!(regex_matching("abc", "a.c"));
    }
}
