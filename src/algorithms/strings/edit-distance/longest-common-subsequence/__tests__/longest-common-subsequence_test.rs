include!("../sources/longest-common-subsequence.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_abcbdab_bdcab() {
        assert_eq!(longest_common_subsequence("ABCBDAB", "BDCAB"), 4);
    }

    #[test]
    fn test_source_empty() {
        assert_eq!(longest_common_subsequence("", "abc"), 0);
    }

    #[test]
    fn test_target_empty() {
        assert_eq!(longest_common_subsequence("abc", ""), 0);
    }

    #[test]
    fn test_two_empty_strings() {
        assert_eq!(longest_common_subsequence("", ""), 0);
    }

    #[test]
    fn test_identical_strings() {
        assert_eq!(longest_common_subsequence("abc", "abc"), 3);
    }

    #[test]
    fn test_no_shared_characters() {
        assert_eq!(longest_common_subsequence("abc", "xyz"), 0);
    }

    #[test]
    fn test_single_shared_character() {
        assert_eq!(longest_common_subsequence("a", "a"), 1);
    }

    #[test]
    fn test_single_chars_differ() {
        assert_eq!(longest_common_subsequence("a", "b"), 0);
    }

    #[test]
    fn test_aggtab_gxtxayb() {
        assert_eq!(longest_common_subsequence("AGGTAB", "GXTXAYB"), 4);
    }

    #[test]
    fn test_abc_ac() {
        assert_eq!(longest_common_subsequence("ABC", "AC"), 2);
    }

    #[test]
    fn test_repeated_characters() {
        assert_eq!(longest_common_subsequence("aaa", "aa"), 2);
    }

    #[test]
    fn test_ab_b() {
        assert_eq!(longest_common_subsequence("AB", "B"), 1);
    }

    #[test]
    fn test_abcde_ace() {
        assert_eq!(longest_common_subsequence("ABCDE", "ACE"), 3);
    }

    #[test]
    fn test_xmjyauz_mzjawxu() {
        assert_eq!(longest_common_subsequence("XMJYAUZ", "MZJAWXU"), 4);
    }
}
