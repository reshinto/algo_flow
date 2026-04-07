include!("jaro-winkler-similarity.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_martha_marhta() {
        assert!((jaro_winkler_similarity("martha", "marhta") - 0.9611).abs() < 0.0001);
    }

    #[test]
    fn test_identical_strings() {
        assert_eq!(jaro_winkler_similarity("abc", "abc"), 1.0);
    }

    #[test]
    fn test_two_empty_strings() {
        assert_eq!(jaro_winkler_similarity("", ""), 1.0);
    }

    #[test]
    fn test_source_empty() {
        assert_eq!(jaro_winkler_similarity("", "abc"), 0.0);
    }

    #[test]
    fn test_target_empty() {
        assert_eq!(jaro_winkler_similarity("abc", ""), 0.0);
    }

    #[test]
    fn test_completely_different() {
        assert_eq!(jaro_winkler_similarity("abc", "xyz"), 0.0);
    }

    #[test]
    fn test_crate_trace() {
        let score = jaro_winkler_similarity("CRATE", "TRACE");
        assert!(score > 0.7 && score < 0.8, "Expected between 0.7 and 0.8, got: {}", score);
    }

    #[test]
    fn test_dwayne_duane() {
        let score = jaro_winkler_similarity("DwAyNE", "DuANE");
        assert!(score >= 0.84, "Expected >= 0.84, got: {}", score);
    }

    #[test]
    fn test_identical_single_chars() {
        assert_eq!(jaro_winkler_similarity("a", "a"), 1.0);
    }

    #[test]
    fn test_value_in_range() {
        let score = jaro_winkler_similarity("algorithm", "logarithm");
        assert!(score >= 0.0 && score <= 1.0);
    }

    #[test]
    fn test_symmetric() {
        let forward = jaro_winkler_similarity("martha", "marhta");
        let backward = jaro_winkler_similarity("marhta", "martha");
        assert_eq!(forward, backward);
    }

    #[test]
    fn test_prefix_bonus() {
        let with_prefix = jaro_winkler_similarity("JOHNSON", "JHNSON");
        let without_prefix = jaro_winkler_similarity("AOHNSON", "JHNSON");
        assert!(with_prefix > without_prefix);
    }

    #[test]
    fn test_prefix_capped_at_four() {
        let four_prefix = jaro_winkler_similarity("abcdefgh", "abcdXXXX");
        let three_prefix = jaro_winkler_similarity("abcXefgh", "abcdXXXX");
        assert!(four_prefix > three_prefix);
    }
}
