include!("../sources/jewels-and-stones.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_returns_3_for_default() {
        assert_eq!(jewels_and_stones("aA", "aAAbbbb"), 3);
    }

    #[test]
    fn test_returns_0_when_no_stones_are_jewels() {
        assert_eq!(jewels_and_stones("z", "aAAbbbb"), 0);
    }

    #[test]
    fn test_returns_full_stone_count_when_every_stone_is_jewel() {
        assert_eq!(jewels_and_stones("abc", "abcabc"), 6);
    }

    #[test]
    fn test_handles_empty_stones_string() {
        assert_eq!(jewels_and_stones("aA", ""), 0);
    }

    #[test]
    fn test_handles_single_matching_stone() {
        assert_eq!(jewels_and_stones("a", "a"), 1);
    }

    #[test]
    fn test_handles_single_non_matching_stone() {
        assert_eq!(jewels_and_stones("a", "b"), 0);
    }

    #[test]
    fn test_is_case_sensitive() {
        assert_eq!(jewels_and_stones("A", "aA"), 1);
    }

    #[test]
    fn test_handles_duplicate_jewel_characters() {
        assert_eq!(jewels_and_stones("aa", "aaa"), 3);
    }
}
